//importando componentes
import AdminCategories from "../../components/AdminCategories/AdminCategories.jsx";

//css
import "./css/AdminCategoriesPage.css";

//exportando pagina de controle das categorias do admin
export default function AdminCategoriesPage() {
  return (
    <div className="admin-categories-page">
      <AdminCategories />
    </div>
  );
}
