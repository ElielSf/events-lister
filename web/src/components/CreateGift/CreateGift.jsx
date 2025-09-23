//importações nativas
import { useState, useEffect } from "react";

//libs
import { useNavigate, useParams } from "react-router-dom";

//importando hook de notificações
import useToast from "../../hooks/useToast.jsx";

//importando as rotas GET
import {
  getAllPaymentMethods,
  getAllCategories,
} from "../../services/apiRequests.jsx";

//css
import "./css/CreateGift.css";

//componente que contém o formulário de criação de presentes
export default function CreateGift() {
  //hook com os dados do formulário
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    max_limit: "",
    image: null,
  });

  //hook com os ids das informacoes escolhidas
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  //hook com os dados das opcoes dos inputs
  const [options, setOptions] = useState({
    payments: [],
    categories: [],
  });

  //hook para navegação entre rotas
  const navigate = useNavigate();

  //pega o id do evento via params
  const { id } = useParams();

  //hook para notificações
  const { notify } = useToast();

  //url base da api
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  //funcao que busca os dados das opcoes dos inputs
  const fetchData = async () => {
    try {
      //executando todas as requisicoes
      const [payments, categories] = await Promise.all([
        getAllPaymentMethods(),
        getAllCategories(),
      ]);

      //valida se houve algum erro durante as requisicoes
      if (payments === null || categories === null) {
        notify(
          "error",
          "Houve um erro interno, entre em contato com o suporte"
        );
      }

      //atualiza as options com os dados recebidos
      setOptions({ payments: payments, categories: categories });
    } catch (error) {
      notify("error", "Erro ao buscar os dados, recarregue a página");
    }
  };

  //faz as requisicoes quando o componente for montado
  useEffect(() => {
    fetchData();
  }, []);

  // função que atualiza os valores do hook formData
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevState) => ({ ...prevState, image: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  // função assíncrona que faz requisição ao backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCategoryId) {
      notify("warning", "Selecione uma categoria antes de continuar");
      return;
    }

    if (!selectedPaymentId) {
      notify("warning", "Selecione um método de pagamento antes de continuar");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        notify("error", "Você precisa estar logado.");
        navigate("/login");
        return;
      }

      // FormData para enviar imagem + texto
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("max_limit", formData.max_limit);
      formDataToSend.append("image", formData.image);
      formDataToSend.append("payment_m_id", selectedPaymentId);
      formDataToSend.append("event_id", id);
      formDataToSend.append("category_id", selectedCategoryId);

      const response = await fetch(`${API_BASE_URL}/gift/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const json = await response.json();

      if (response.ok) {
        notify("success", json.message);
        navigate("/admin/gifts");
      } else {
        notify("error", json.error);
      }
    } catch (error) {
      notify("error", "Falha ao criar presente, tente novamente.");
    }
  };

  return (
    <form
      className="admin-create-gift-form"
      id="admin-create-gift-form"
      onSubmit={handleSubmit}
    >
      <label className="admin-create-gift-form__label">
        Criar novo presente
      </label>

      <div className="admin-create-gift-form__div">
        <label
          className="admin-create-gift-form__div__label"
          htmlFor="gift-image"
        >
          Imagem do presente
        </label>
        <input
          className="admin-create-gift-form__div__input"
          id="gift-image"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
        />
      </div>

      <div className="admin-create-gift-form__div">
        <label
          className="admin-create-gift-form__div__label"
          htmlFor="gift-name"
        >
          Nome do presente
        </label>
        <input
          className="admin-create-gift-form__div__input"
          id="gift-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Digite o nome do presente"
          required
        />
      </div>

      <div className="admin-create-gift-form__div">
        <label
          className="admin-create-gift-form__div__label"
          htmlFor="gift-price"
        >
          Preço do presente (R$)
        </label>
        <input
          className="admin-create-gift-form__div__input"
          id="gift-price"
          type="number"
          step="0.01"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Digite o preço do presente"
          required
        />
      </div>

      <div className="admin-create-gift-form__div">
        <label
          className="admin-create-gift-form__div__label"
          htmlFor="gift-limit"
        >
          Limite máximo de presentes cadastrados
        </label>
        <input
          className="admin-create-gift-form__div__input"
          id="gift-limit"
          type="number"
          name="max_limit"
          value={formData.max_limit}
          onChange={handleChange}
          min="1"
          placeholder="Digite o limite de presentes"
          required
        />
      </div>

      {/* Select de pagamento */}
      <div className="admin-create-gift-form__div">
        <label
          className="admin-create-gift-form__div__label"
          htmlFor="gift-payment"
        >
          Método de pagamento
        </label>
        <select
          id="gift-payment"
          className="admin-create-gift-form__div__input"
          value={selectedPaymentId || ""}
          onChange={(e) => setSelectedPaymentId(e.target.value)}
          required
        >
          <option value="" disabled>
            -- Escolha um método de pagamento --
          </option>
          {options.payments.map((payment) => (
            <option key={payment.id_payment_m} value={payment.id_payment_m}>
              {payment.payment_m_name}
            </option>
          ))}
        </select>
      </div>

      {/* Select de categoria */}
      <div className="admin-create-gift-form__div">
        <label
          className="admin-create-gift-form__div__label"
          htmlFor="gift-category"
        >
          Categoria
        </label>
        <select
          id="gift-category"
          className="admin-create-gift-form__div__input"
          value={selectedCategoryId || ""}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          required
        >
          <option value="" disabled>
            -- Escolha uma categoria --
          </option>
          {options.categories.map((category) => (
            <option key={category.id_category} value={category.id_category}>
              {category.category_name}
            </option>
          ))}
        </select>
      </div>

      <button
        className="admin-create-gift-form__button"
        type="submit"
        form="admin-create-gift-form"
      >
        Criar
      </button>
    </form>
  );
}
