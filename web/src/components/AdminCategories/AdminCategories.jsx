// importações nativas
import { useState, useEffect } from "react";

// libs
import { useNavigate } from "react-router-dom";

// importando hook de notificações
import useToast from "../../hooks/useToast";

// importando as rotas GET
import { getAllCategories } from "../../services/apiRequests.jsx";

// css
import "./css/AdminCategories.css";

// componente que contém as ações de controle das categorias do admin
export default function AdminCategories() {
  // hook com os dados de categorias
  const [data, setData] = useState({
    categories: [],
  });

  // hook para selecionar o id da categoria
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // hook para navegação entre rotas
  const navigate = useNavigate();

  // hook para notificações
  const { notify } = useToast();

  // url base da api
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  // função que busca os dados das categorias
  const fetchData = async () => {
    try {
      const categories = await getAllCategories();

      if (!categories) {
        throw new Error(
          "Houve um erro interno, entre em contato com o suporte"
        );
      }

      setData({ categories });
    } catch (error) {
      notify("error", "Erro ao buscar os dados, recarregue a página");
    }
  };

  // faz a requisição quando o componente for montado
  useEffect(() => {
    fetchData();
  }, []);

  // função para armazenar a categoria clicada
  const handleCategoryClick = (id) => {
    setSelectedCategoryId(id);
  };

  // função para lidar com a edição de uma categoria
  const handleEdit = () => {
    if (!selectedCategoryId) {
      notify("warning", "Selecione uma categoria primeiro");
      return;
    }

    const categoryToEdit = data.categories.find(
      (c) => c.id_category === selectedCategoryId
    );

    navigate(`/admin/categories/edit/${selectedCategoryId}`, {
      state: { category: categoryToEdit },
    });
  };

  // função para lidar com a exclusão de uma categoria
  const handleDelete = async (e) => {
    if (!selectedCategoryId) {
      notify("warning", "Selecione uma categoria primeiro");
      return;
    }

    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(
        `${API_BASE_URL}/category/${selectedCategoryId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await response.json();

      if (response.ok) {
        notify("success", json.message);
      } else {
        notify("error", json.error);
      }

      // atualiza a lista
      setData((prev) => ({
        categories: prev.categories.filter(
          (c) => c.id_category !== selectedCategoryId
        ),
      }));

      setSelectedCategoryId(null);
    } catch (error) {
      notify("error", "Erro ao deletar categoria.");
    }
  };

  return (
    <div className="admin-categories">
      <h2 className="admin-categories__title">Categorias</h2>
      <div className="admin-categories__content">
        <div className="admin-categories__content__div">
          <button
            className="admin-categories__content__div__button add"
            onClick={() => navigate("/admin/categories/create")}
          >
            Adicionar
          </button>
          <button
            className="admin-categories__content__div__button alter"
            onClick={handleEdit}
          >
            Editar
          </button>
          <button
            className="admin-categories__content__div__button delete"
            onClick={handleDelete}
          >
            Deletar
          </button>
        </div>
        <div className="admin-categories__content__list">
          {data.categories.map((category) => (
            <div
              className={`admin-categories__content__list__item ${
                selectedCategoryId === category.id_category
                  ? "admin-categories__content__list__item--selected"
                  : ""
              }`}
              key={category.id_category}
              onClick={() => handleCategoryClick(category.id_category)}
            >
              <h3 className="admin-categories__content__list__item__title">
                {category.category_name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
