//libs
import { Navigate } from "react-router-dom";

//componente para verificar a autenticacao do usuario
export default function PrivateRoute({ children }) {
  //obtem o token armazenado no localStorage
  const token = localStorage.getItem("authToken");

  //se o token nao existir redireciona para o login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  //se estiver autenticado renderiza os componentes filhos(rota protegida)
  return children;
}
