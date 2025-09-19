//importacoes nativas
import { useState, useEffect, use } from "react";

//libs
import { useNavigate } from "react-router-dom";

//importando hook de notificacoes
import useToast from "../../hooks/useToast";

//css
import "./css/Register.css";

//exportando o componente de registro de usuário
export default function Register() {
  //hook que contém os dados para o registro
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    password: "",
    event_password: "",
    phone: "",
    email: "",
  });

  //hook que altera o formulario em exibicao
  const [alterForm, setAlterForm] = useState(false);

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

  //funcao que valida os campos antes de alterar o formulario
  const handleContinue = () => {
    if (!formData.cpf.trim()) {
      notify("error", "O campo CPF é obrigatório.");
      return;
    }

    if (formData.cpf.trim().length !== 11) {
      notify("error", "O CPF deve ter exatamente 11 números.");
      return;
    }

    if (!formData.event_password.trim()) {
      notify("error", "A senha do evento é obrigatória.");
      return;
    }

    if (formData.event_password.trim().length < 6) {
      notify("error", "A senha do evento deve ter no mínimo 6 caracteres.");
      return;
    }

    setAlterForm(true);
  };

  //funcao assincrona que faz requisicao ao backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //fetch ao backend
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      //obtem o json da resposta
      const json = await response.json();

      if (response.ok) {
        //notificacao de sucesso
        notify("success", json.message);

        //redireciona para a pagina de login
        navigate("/login");
      } else {
        //usuario ja existe
        if (response.status === 400) {
          notify("error", json.error);
        }

        //erro interno no servidor
        if (response.status === 500) {
          notify("error", json.error);
        }
      }
    } catch (error) {
      //em caso de erro no react
      notify("error", "Falha na criação da conta, tente novamente.");
    }
  };

  return (
    <form className="register-form" id="register-form" onSubmit={handleSubmit}>
      {alterForm === false ? (
        <div className="register-form__container">
          <label className="register-form__container__label">
            Cadastre-se para entrar na sala
          </label>

          <div className="register-form__container__div">
            <label
              className="register-form__container__div__label"
              htmlFor="register-form-cpf"
            >
              CPF
            </label>
            <input
              className="register-form__container__div__input"
              id="register-form-cpf"
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

          <div className="register-form__container__div">
            <label
              className="register-form__container__div__label"
              htmlFor="register-form-event-password"
            >
              Senha do evento
            </label>
            <input
              className="register-form__container__div__input"
              id="register-form-event-password"
              type="password"
              name="event_password"
              title="Preencha este campo."
              minLength={6}
              value={formData.event_password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="register-form__container__button"
            type="button"
            onClick={handleContinue}
          >
            Continuar
          </button>
        </div>
      ) : (
        <div className="register-form__container2">
          <label className="register-form__container2__label">
            Continue seu cadastro
          </label>

          <div className="register-form__container2__div">
            <label
              className="register-form__container2__div__label"
              htmlFor="register-form-name"
            >
              Nome
            </label>
            <input
              className="register-form__container2__div__input"
              id="register-form-name"
              type="text"
              name="name"
              title="Preencha este campo."
              minLength={3}
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="register-form__container2__div">
            <label
              className="register-form__container2__div__label"
              htmlFor="register-form-phone"
            >
              Telefone
            </label>
            <input
              className="register-form__container2__div__input"
              id="register-form-phone"
              type="tel"
              name="phone"
              title="Preencha este campo."
              minLength={11}
              maxLength={11}
              value={formData.phone}
              onChange={handleChange}
              placeholder="Somente números (DDD + numero)"
              required
            />
          </div>

          <div className="register-form__container2__div">
            <label
              className="register-form__container2__div__label"
              htmlFor="register-form-email"
            >
              Email
            </label>
            <input
              className="register-form__container2__div__input"
              id="register-form-email"
              type="email"
              name="email"
              title="Preencha este campo."
              minLength={10}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="register-form__container2__button"
            type="submit"
            form="register-form"
          >
            Cadastrar
          </button>
        </div>
      )}
    </form>
  );
}
