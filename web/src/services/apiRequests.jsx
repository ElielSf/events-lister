//url base da api
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

//funcao para fazer requisicao as rotas de busca de dados
export const fetchData = async (endpoint, options = {}) => {
  const token = localStorage.getItem("authToken");

  //verifica se o usuario esta logado
  if (!token) {
    //redireciona para a pagina de login
    window.location.href = "/login";

    return null;
  }

  //configura o cabecalho da requisicao
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  //faz a requisicao
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  //em caso do token ser invalido
  if (response.status === 401 || response.status === 403) {
    //limpa o token invalido
    localStorage.removeItem("authToken");

    //redireciona para a pagina de login
    window.location.href = "/login";

    return null;
  }

  //em caso de falha na requisicao
  if (!response.ok) {
    return null;
  }

  const json = await response.json();

  //em caso de sucesso na requisicao
  return json;
};

//rotas especificas GET
export const getAllPaymentMethods = () => fetchData("/payment/");
export const getAllEvents = () => fetchData("/event/");
export const getAllCategories = () => fetchData("/category/");