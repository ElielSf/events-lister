//libs
import { Navigate } from "react-router-dom";

//componente para verificar e autorizar rotas de admin
export default function AdminRoute({ children }) {
  //obtem o token armazena no localStorage
  const token = localStorage.getItem("authToken");

  //obtem o papel(role) armazenado no localStorage
  const userRole = localStorage.getItem("role");

  //se o token nao existir redireciona para o login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  //verifica se a pessoa nao é um admin
  if (userRole !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  //se estiver autenticado renderiza os componentes filhos(rota protegida)
  return children;
}
