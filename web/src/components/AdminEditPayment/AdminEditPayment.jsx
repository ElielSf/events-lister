//importacoes nativas
import { useState, useEffect } from "react";

//libs
import { useNavigate, useParams, useLocation } from "react-router-dom";

//importando hook de notificacoes
import useToast from "../../hooks/useToast.jsx";

//css
import "./css/AdminEditPayment.css";

//componente que contem o formulario de edicao de metodo de pagamento
export default function AdminEditPayment() {
  //hook com os dados do formulario
  const [formData, setFormData] = useState({
    id: "",
    name: "",
  });

  //hook para navegacao entre rotas
  const navigate = useNavigate();

  //hook para notificacoes
  const { notify } = useToast();

  //url base da api
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  //pega o id do metodo via params
  const { id } = useParams();

  //pega os dados do menu anterior
  const { state } = useLocation();
  const paymentData = state.payment;

  //busca os dados do metodo de pagamento
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      notify("error", "Você precisa estar logado.");
      navigate("/login");
      return;
    }

    //armazena os dados para serem alterados
    setFormData({
      id: paymentData.id_payment_m,
      name: paymentData.payment_m_name,
    });
  }, []);

  //funcao que atualiza os valores do hook formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  //funcao assincrona que faz requisicao ao backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        notify("error", "Você precisa estar logado.");
        navigate("/login");
        return;
      }

      //fetch ao backend
      const response = await fetch(`${API_BASE_URL}/payment/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();

      if (response.ok) {
        notify("success", json.message);

        navigate("/admin/payments");
      } else {
        //nenhuma alteracao foi feita
        if (response.status === 400) {
          notify("error", json.error);
        }

        //metodo de pagamento nao encontrado
        if (response.status === 404) {
          notify("error", json.error);
        }
      }
    } catch (error) {
      notify(
        "error",
        "Falha ao atualizar método de pagamento, tente novamente."
      );
    }
  };

  return (
    <form
      className="admin-edit-payment-form"
      id="admin-edit-payment-form"
      onSubmit={handleSubmit}
    >
      <label className="admin-edit-payment-form__label">
        Editar método de pagamento
      </label>
      <div className="admin-edit-payment-form__div">
        <label
          className="admin-edit-payment-form__div__label"
          htmlFor="name"
        >
          Nome do método
        </label>
        <input
          className="admin-edit-payment-form__div__input"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Digite o nome do método"
          required
        />
      </div>
      <button
        className="admin-edit-payment-form__button"
        type="submit"
        form="admin-edit-payment-form"
      >
        Atualizar
      </button>
    </form>
  );
}
