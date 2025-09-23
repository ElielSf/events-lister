// importações nativas
import { useState, useEffect } from "react";

// libs
import { useNavigate } from "react-router-dom";

// importando hook de notificações
import useToast from "../../hooks/useToast";

// importando as rotas GET
import { getAllEvents } from "../../services/apiRequests.jsx";

// css
import "./css/AdminEvents.css";

// componente que contém as ações de controle dos eventos do admin
export default function AdminEvents() {
  // hook com os dados de eventos
  const [data, setData] = useState({
    events: [],
  });

  // hook para selecionar o id do evento
  const [selectedEventId, setSelectedEventId] = useState(null);

  // hook para navegação entre rotas
  const navigate = useNavigate();

  // hook para notificações
  const { notify } = useToast();

  // url base da api
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  // função que busca os dados dos eventos
  const fetchData = async () => {
    try {
      const events = await getAllEvents();

      if (!events) {
        throw new Error(
          "Houve um erro interno, entre em contato com o suporte"
        );
      }

      setData({ events });
    } catch (error) {
      notify("error", "Erro ao buscar os dados, recarregue a página");
    }
  };

  // faz a requisição quando o componente for montado
  useEffect(() => {
    fetchData();
  }, []);

  // função para armazenar o evento clicado
  const handleEventClick = (id) => {
    setSelectedEventId(id);
  };

  // função para lidar com a edição de um evento
  const handleEdit = () => {
    if (!selectedEventId) {
      notify("warning", "Selecione um evento primeiro");
      return;
    }

    const eventToEdit = data.events.find((e) => e.id_event === selectedEventId);

    navigate(`/admin/events/edit/${selectedEventId}`, {
      state: { event: eventToEdit },
    });
  };

  // função para lidar com a exclusão de um evento
  const handleDelete = async (e) => {
    if (!selectedEventId) {
      notify("warning", "Selecione um evento primeiro");
      return;
    }

    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(`${API_BASE_URL}/event/${selectedEventId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();

      if (response.ok) {
        notify("success", json.message);
      } else {
        notify("error", json.error);
      }

      // atualiza a lista
      setData((prev) => ({
        events: prev.events.filter((e) => e.id_event !== selectedEventId),
      }));

      setSelectedEventId(null);
    } catch (error) {
      notify("error", "Erro ao deletar evento.");
    }
  };

  return (
    <div className="admin-events">
      <h2 className="admin-events__title">Eventos</h2>
      <div className="admin-events__content">
        <div className="admin-events__content__div">
          <button
            className="admin-events__content__div__button add"
            onClick={() => navigate("/admin/events/create")}
          >
            Adicionar
          </button>
          <button
            className="admin-events__content__div__button alter"
            onClick={handleEdit}
          >
            Editar
          </button>
          <button
            className="admin-events__content__div__button delete"
            onClick={handleDelete}
          >
            Deletar
          </button>
        </div>
        <div className="admin-events__content__list">
          {data.events.map((event) => (
            <div
              className={`admin-events__content__list__item ${
                selectedEventId === event.id_event
                  ? "admin-events__content__list__item--selected"
                  : ""
              }`}
              key={event.id_event}
              onClick={() => handleEventClick(event.id_event)}
            >
              <h3 className="admin-events__content__list__item__title">
                <b>{event.event_name}</b>
              </h3>
              <p className="admin-events__content__list__item__info">
                Localização: <b>{event.event_address}</b>
              </p>
              <p className="admin-events__content__list__item__info">
                Data:{" "}
                <b>
                  {new Date(event.event_date).toLocaleDateString("pt-br", {
                    dateStyle: "full",
                  })}
                </b>
              </p>
              <p className="admin-events__content__list__item__info">
                Horário:{" "}
                <b>
                  {new Date(event.event_date).toLocaleTimeString("pt-br", {
                    timeStyle: "short",
                  })}hrs
                </b>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
