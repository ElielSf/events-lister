//importacoes nativas
import { useState, useEffect } from "react";

//libs
import { useNavigate, useParams, useLocation } from "react-router-dom";

//importando hook de notificacoes
import useToast from "../../hooks/useToast.jsx";

//css
import "./css/AdminEditCategory.css";

//componente que contem o formulario de edicao de categoria
export default function AdminEditCategory() {
  //hook com os dados do formulario
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
  });

  //hook para navegacao entre rotas
  const navigate = useNavigate();

  //hook para notificacoes
  const { notify } = useToast();

  //url base da api
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  //pega o id da categoria via params
  const { id } = useParams();

  //pega os dados do menu anterior
  const { state } = useLocation();
  const categoryData = state.category;

  //busca os dados da categoria
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      notify("error", "Você precisa estar logado.");
      navigate("/login");
      return;
    }

    //armazena os dados para serem alterados
    setFormData({
      id: categoryData.id_category,
      name: categoryData.category_name,
      description: categoryData.category_description,
    });
  }, []);

  //funcao que atualiza os valores do hook formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  //funcao assincrona que faz requisicao ao backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        notify("error", "Você precisa estar logado.");
        navigate("/login");
        return;
      }

      //fetch ao backend
      const response = await fetch(`${API_BASE_URL}/category/${formData.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const json = await response.json();

      if (response.ok) {
        notify("success", json.message);
        navigate("/admin/categories");
      } else {
        if (response.status === 400) {
          notify("error", json.error);
        }
        if (response.status === 404) {
          notify("error", json.error);
        }
      }
    } catch (error) {
      notify("error", "Falha ao atualizar categoria, tente novamente.");
    }
  };

  return (
    <form
      className="admin-edit-category-form"
      id="admin-edit-category-form"
      onSubmit={handleSubmit}
    >
      <label className="admin-edit-category-form__label">
        Editar categoria
      </label>
      <div className="admin-edit-category-form__div">
        <label className="admin-edit-category-form__div__label" htmlFor="name">
          Nome da categoria
        </label>
        <input
          className="admin-edit-category-form__div__input"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Digite o nome da categoria"
          required
        />
      </div>
      <button
        className="admin-edit-category-form__button"
        type="submit"
        form="admin-edit-category-form"
      >
        Atualizar
      </button>
    </form>
  );
}
