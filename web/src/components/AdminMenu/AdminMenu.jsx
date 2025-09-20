//libs
import { useNavigate } from "react-router-dom";

//css
import "./css/AdminMenu.css";

//componente que contem o menu principal do admin
export default function AdminMenu() {
  //hook para navegacao entre rotas
  const navigate = useNavigate();

  return (
    <div className="admin-menu">
      <h2 className="admin-menu__title">Menu do Administrador</h2>
      <div className="admin-menu__div">
        <button
          className="admin-menu__div__btn"
          onClick={() => navigate("/admin/events")}
        >
          Eventos
        </button>
        <button
          className="admin-menu__div__btn"
          onClick={() => navigate("/admin/gifts")}
        >
          Presentes
        </button>
        <button
          className="admin-menu__div__btn"
          onClick={() => navigate("/admin/categories")}
        >
          Categorias
        </button>
        <button
          className="admin-menu__div__btn"
          onClick={() => navigate("/admin/payments")}
        >
          Pagamentos
        </button>
      </div>
    </div>
  );
}
