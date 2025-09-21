//importacoes nativas
import { useState } from "react";

//libs
import { useNavigate } from "react-router-dom";

//importando hook de notificacoes
import useToast from "../../hooks/useToast";

//css
import "./css/AdminCreatePayment.css";

//componente que contem o formulario de criacao de metodo de pagamento
export default function AdminCreatePayment() {
  //hook com os dados do formulario
  const [formData, setFormData] = useState({
    name: "",
  });

  //hook para navegacao entre rotas
  const navigate = useNavigate();

  //hook para notificacoes
  const { notify } = useToast();

  //url base da api
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

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
      const response = await fetch(`${API_BASE_URL}/payment/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: formData.name }),
      });

      const json = await response.json();

      if (response.ok) {
        notify("success", json.message);
        navigate("/admin/payments");
      } else {
        notify("error", json.error);
      }
    } catch (error) {
      notify("error", "Falha ao criar método de pagamento, tente novamente.");
    }
  };

  return (
    <form
      className="admin-create-payment-form"
      id="admin-create-payment-form"
      onSubmit={handleSubmit}
    >
      <label className="admin-create-payment-form__label">
        Criar novo método de pagamento
      </label>
      <div className="admin-create-payment-form__div">
        <label
          className="admin-create-payment-form__div__label"
          htmlFor="payment-name"
        >
          Nome do método
        </label>
        <input
          className="admin-create-payment-form__div__input"
          id="payment-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Digite o nome do método"
          required
        />
      </div>
      <button
        className="admin-create-payment-form__button"
        type="submit"
        form="admin-create-payment-form"
      >
        Criar
      </button>
    </form>
  );
}
