// importações nativas
import { useState, useEffect } from "react";

// libs
import { useNavigate } from "react-router-dom";

// importando hook de notificações
import useToast from "../../hooks/useToast.jsx";

// importando as rotas GET
import { getAllEvents } from "../../services/apiRequests.jsx";

// css
import "./css/AccessEvent.css";

// funcao para validar a senha de acesso aos eventos
export default function AccessEvent() {
  const [data, setData] = useState({
    events: [],
  });
  const [password, setPassword] = useState("");

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

  async function handleSubmit(e) {
    e.preventDefault();

    if (!selectedEventId) {
      notify("warning", "Selecione um evento antes de continuar");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${API_BASE_URL}/event/${selectedEventId}/access`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password }),
        }
      );

      const json = await response.json();

      if (response.ok) {
        localStorage.setItem(`event_token_${selectedEventId}`, json.token);

        notify("success", "Senha correta");

        navigate(`/event/${selectedEventId}/`);
      } else {
        notify("error", "Senha incorreta");
      }
    } catch (err) {
      notify("error", "Houve um erro ao enviar a senha");
    }
  }

  return (
    <div className="access-event">
      <form onSubmit={handleSubmit} className="access-event__form">
        <h1 className="access-event__title">Acessar Evento</h1>

        <label className="access-event__label">Selecione o Evento:</label>
        <select
          value={selectedEventId || ""}
          onChange={(e) => setSelectedEventId(e.target.value)}
          className="access-event__select"
          required
        >
          <option value="" disabled>
            -- Escolha um evento --
          </option>
          {data.events.map((event) => (
            <option key={event.id_event} value={event.id_event}>
              {event.event_name} -{" "}
              {new Date(event.event_date).toLocaleDateString()}
            </option>
          ))}
        </select>

        <label className="access-event__label">Senha do Evento:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          className="access-event__input"
          required
        />

        <button type="submit" className="access-event__button">
          Entrar
        </button>
      </form>
    </div>
  );
}
