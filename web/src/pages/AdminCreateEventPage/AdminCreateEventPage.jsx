//importando componentes
import AdminCreateEvent from "../../components/AdminCreateEvent/AdminCreateEvent.jsx";

//css
import "./css/AdminCreateEventPage.css";

//exportando pagina de criacao dos eventos
export default function AdminCreateEventPage() {
  return (
    <div className="admin-create-event-page">
      <AdminCreateEvent />
    </div>
  );
}
