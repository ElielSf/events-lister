//importacoes nativas
import { useState, useEffect } from "react";

//libs
import { useNavigate } from "react-router-dom";

//importando hook de notificacoes
import useToast from "../../hooks/useToast";

//css
import "./css/Login.css";

//componente que contem o formulario de login
export default function Login() {
  //hook com os dados do formulario
  const [formData, setFormData] = useState({
    cpf: "",
    password: "",
  });

  //hook para navegacao entre rotas
  const navigate = useNavigate();

  //verifica se o usuario ja fez login
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      //redireciona para o menu
      navigate("/menu");
    }
  }, []);

  //hook para notificacoes
  const { notify } = useToast();

  //url base da api
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  //funcao que atualiza os valores do hook formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  //funcao assincrona que faz requisicao ao backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //fetch ao backend
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      //obtem o json da resposta
      const json = await response.json();

      if (response.ok) {
        //armazena o token no localStorage
        localStorage.setItem("authToken", json.token);

        //notificacao de sucesso
        notify("success", json.message);

        //redireciona para o menu
        navigate("/menu");
      } else {
        //senha invalida
        if (response.status === 401) {
          notify("error", json.error);
        }

        //usuario nao encontrado
        if (response.status === 404) {
          notify("error", json.error);
        }

        //erro interno no servidor
        if (response.status === 500) {
          notify("error", json.error);
        }
      }
    } catch (error) {
      //em caso de erro no react
      notify("error", "Falha no login, tente novamente.");
    }
  };

  return (
    <form className="login-form" id="login-form" onSubmit={handleSubmit}>
      <label className="login-form__label">
        Entre na sua conta
      </label>
      <div className="login-form__div">
        <label className="login-form__div__label" htmlFor="login-form-cpf">
          CPF
        </label>
        <input
          className="login-form__div__input"
          id="login-form-cpf"
          type="text"
          name="cpf"
          title="Preencha este campo."
          minLength={11}
          maxLength={11}
          value={formData.cpf}
          onChange={handleChange}
          placeholder="Somente números"
          required
        />
      </div>
      <div className="login-form__div">
        <label className="login-form__div__label" htmlFor="login-form-password">
          Senha
        </label>
        <input
          className="login-form__div__input"
          id="login-form-password"
          type="password"
          name="password"
          title="Preencha este campo."
          minLength={6}
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button className="login-form__button" type="submit" form="login-form">
        Login
      </button>
    </form>
  );
}
