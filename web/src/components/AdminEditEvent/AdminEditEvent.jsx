// importações nativas
import { useState, useEffect } from "react";

// libs
import { useNavigate, useParams, useLocation } from "react-router-dom";

// hook de notificações
import useToast from "../../hooks/useToast.jsx";

//utils
import { formatDateForInput } from "../../utils/formatDateForInput.js";

// css
import "./css/AdminEditEvent.css";

// componente que contém o formulário de edição de evento
export default function AdminEditEvent() {
  // estado com os dados do formulário
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    date: "",
    address: "",
  });

  // hooks de rota
  const navigate = useNavigate();

  // hook de notificação
  const { notify } = useToast();

  // url base
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  //pega o id da categoria via params
  const { id } = useParams();

  //pega os dados do menu anterior
  const { state } = useLocation();
  const eventData = state.event;

  //buscar dados atuais do evento
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      notify("error", "Você precisa estar logado.");
      navigate("/login");
      return;
    }

    //armazena os dados para serem alterados
    setFormData({
      id: eventData.id_event,
      name: eventData.event_name,
      date: formatDateForInput(eventData.event_date),
      address: eventData.event_address,
    });
  }, []);

  //atualiza valores do formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  //submit do form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        notify("error", "Você precisa estar logado.");
        navigate("/login");
        return;
      }

      console.log("id ", formData.id);
      const response = await fetch(`${API_BASE_URL}/event/${formData.id}`, {
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
        navigate("/admin/events");
      } else {
        notify("error", json.error);
      }
    } catch (error) {
      notify("error", "Falha ao atualizar evento, tente novamente.");
    }
  };

  return (
    <form
      className="admin-edit-event-form"
      id="admin-edit-event-form"
      onSubmit={handleSubmit}
    >
      <label className="admin-edit-event-form__label">Editar evento</label>

      {/* Nome */}
      <div className="admin-edit-event-form__div">
        <label
          className="admin-edit-event-form__div__label"
          htmlFor="event-name"
        >
          Nome do evento
        </label>
        <input
          className="admin-edit-event-form__div__input"
          id="event-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      {/* Data */}
      <div className="admin-edit-event-form__div">
        <label
          className="admin-edit-event-form__div__label"
          htmlFor="event-date"
        >
          Data do evento
        </label>
        <input
          className="admin-edit-event-form__div__input"
          id="event-date"
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      {/* Endereço */}
      <div className="admin-edit-event-form__div">
        <label
          className="admin-edit-event-form__div__label"
          htmlFor="event-address"
        >
          Endereço do evento
        </label>
        <input
          className="admin-edit-event-form__div__input"
          id="event-address"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>

      <button
        className="admin-edit-event-form__button"
        type="submit"
        form="admin-edit-event-form"
      >
        Salvar alterações
      </button>
    </form>
  );
}
