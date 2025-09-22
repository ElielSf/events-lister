// importações nativas
import { useState } from "react";

// libs
import { useNavigate } from "react-router-dom";

// importando hook de notificações
import useToast from "../../hooks/useToast";

// css
import "./css/AdminCreateCategory.css";

// componente que contém o formulário de criação de categoria
export default function AdminCreateCategory() {
  // hook com os dados do formulário
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // hook para navegação entre rotas
  const navigate = useNavigate();

  // hook para notificações
  const { notify } = useToast();

  // url base da api
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  // função que atualiza os valores do hook formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // função assíncrona que faz requisição ao backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        notify("error", "Você precisa estar logado.");
        navigate("/login");
        return;
      }

      // fetch ao backend
      const response = await fetch(`${API_BASE_URL}/category/`, {
        method: "POST",
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
        notify("error", json.error);
      }
    } catch (error) {
      notify("error", "Falha ao criar categoria, tente novamente.");
    }
  };

  return (
    <form
      className="admin-create-category-form"
      id="admin-create-category-form"
      onSubmit={handleSubmit}
    >
      <label className="admin-create-category-form__label">
        Criar nova categoria
      </label>
      <div className="admin-create-category-form__div">
        <label
          className="admin-create-category-form__div__label"
          htmlFor="category-name"
        >
          Nome da categoria
        </label>
        <input
          className="admin-create-category-form__div__input"
          id="category-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Digite o nome da categoria"
          required
        />
      </div>
      <button
        className="admin-create-category-form__button"
        type="submit"
        form="admin-create-category-form"
      >
        Criar
      </button>
    </form>
  );
}
