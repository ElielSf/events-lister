//importando componentes
import AdminMenu from "../../components/AdminMenu/AdminMenu.jsx";

//css
import "./css/AdminMenuPage.css";

//exportando pagina de menu do admin
export default function AdminMenuPage() {
  return (
    <div className="admin-menu-page">
      <AdminMenu />
    </div>
  );
}
