//importando componentes
import AdminEditCategory from "../../components/AdminEditCategory/AdminEditCategory.jsx";

//css
import "./css/AdminEditCategoryPage.css";

//exportando pagina que atualiza as categorias do admin
export default function AdminEditCategoryPage() {
  return (
    <div className="admin-edit-category-page">
      <AdminEditCategory />
    </div>
  );
}
