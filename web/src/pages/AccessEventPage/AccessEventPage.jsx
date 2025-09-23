//importando componentes
import AccessEvent from "../../components/AccessEvent/AccessEvent.jsx";

//css
import "./css/AccessEventPage.css";

//exportando pagina que verifica a permissao para o evento
export default function AccessEventPage() {
  return (
    <div className="access-event-page">
      <AccessEvent />
    </div>
  );
}
