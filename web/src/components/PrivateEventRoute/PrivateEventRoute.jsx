//libs
import { Navigate, useParams } from "react-router-dom";

//componente para verificar a autenticacao do usuario para certos eventos
export default function PrivateEventRoute({ children }) {
  //obtem o token de login armazenado no localStorage
  const token = localStorage.getItem("authToken");

  //se o token nao existir redireciona para o login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  //pega o id e o token do evento
  const { id } = useParams();
  const event_token = localStorage.getItem(`event_token_${id}`);

  // se não houver token, redireciona para a tela de eventos
  if (!event_token) {
    return <Navigate to="/events/" replace />;
  }

  //se estiver autenticado renderiza os componentes filhos(rota protegida)
  return children;
}
