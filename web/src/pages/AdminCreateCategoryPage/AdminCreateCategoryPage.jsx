//importando componentes
import AdminCreateCategory from "../../components/AdminCreateCategory/AdminCreateCategory.jsx";

//css
import "./css/AdminCreateCategoryPage.css";

//exportando pagina que cria as categorias do admin
export default function AdminCreateCategoryPage() {
  return (
    <div className="admin-create-category-page">
      <AdminCreateCategory />
    </div>
  );
}
