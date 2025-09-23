// importações nativas
import { useState } from "react";

// libs
import { useNavigate } from "react-router-dom";

// importando hook de notificações
import useToast from "../../hooks/useToast";

// css
import "./css/AdminCreateEvent.css";

// componente que contém o formulário de criação de evento
export default function AdminCreateEvent() {
  // hook com os dados do formulário
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    address: "",
    password: "",
    cpf: "",
  });

  // hook para navegação entre rotas
  const navigate = useNavigate();

  // hook para notificações
  const { notify } = useToast();

  // url base da api
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  // função que atualiza os valores do hook formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // função assíncrona que faz requisição ao backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        notify("error", "Você precisa estar logado.");
        navigate("/login");
        return;
      }

      // fetch ao backend
      const response = await fetch(`${API_BASE_URL}/event/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();

      if (response.ok) {
        notify("success", json.message);
        navigate("/admin/events");
      } else {
        notify("error", json.error);
      }
    } catch (error) {
      notify("error", "Falha ao criar evento, tente novamente.");
    }
  };

  return (
    <form
      className="admin-create-event-form"
      id="admin-create-event-form"
      onSubmit={handleSubmit}
    >
      <label className="admin-create-event-form__label">
        Criar novo evento
      </label>

      <div className="admin-create-event-form__div">
        <label
          className="admin-create-event-form__div__label"
          htmlFor="event-host-cpf"
        >
          CPF do anfitrião do evento
        </label>
        <input
          className="admin-create-event-form__div__input"
          id="event-host-cpf"
          type="text"
          name="cpf"
          title="Preencha este campo."
          minLength={11}
          maxLength={11}
          value={formData.cpf}
          onChange={handleChange}
          placeholder="Somente números"
          required
        />
      </div>

      <div className="admin-create-event-form__div">
        <label
          className="admin-create-event-form__div__label"
          htmlFor="event-name"
        >
          Nome do evento
        </label>
        <input
          className="admin-create-event-form__div__input"
          id="event-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Digite o nome do evento"
          required
        />
      </div>

      <div className="admin-create-event-form__div">
        <label
          className="admin-create-event-form__div__label"
          htmlFor="event-date"
        >
          Data do evento
        </label>
        <input
          className="admin-create-event-form__div__input"
          id="event-date"
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="admin-create-event-form__div">
        <label
          className="admin-create-event-form__div__label"
          htmlFor="event-address"
        >
          Endereço do evento
        </label>
        <input
          className="admin-create-event-form__div__input"
          id="event-address"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Digite o endereço do evento"
          required
        />
      </div>

      <div className="admin-create-event-form__div">
        <label
          className="admin-create-event-form__div__label"
          htmlFor="event-password"
        >
          Senha do evento
        </label>
        <input
          className="admin-create-event-form__div__input"
          id="event-password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Digite a senha do evento"
          required
        />
      </div>

      <button
        className="admin-create-event-form__button"
        type="submit"
        form="admin-create-event-form"
      >
        Criar
      </button>
    </form>
  );
}
