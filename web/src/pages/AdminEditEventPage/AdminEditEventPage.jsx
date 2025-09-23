//importando componentes
import AdminEditEvent from "../../components/AdminEditEvent/AdminEditEvent.jsx";

//css
import "./css/AdminEditEventPage.css";

//exportando pagina que atualiza os eventos do admin
export default function AdminEditEventPage() {
  return (
    <div className="admin-edit-event-page">
      <AdminEditEvent />
    </div>
  );
}
