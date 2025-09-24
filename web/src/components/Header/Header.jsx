//importacoes nativas
import { useState, useEffect } from "react";

//lib
import { Link, useNavigate } from "react-router-dom";

//css
import "./css/Header.css";

//componente com o cabecalho da pagina
export default function Header() {
  const [role, setRole] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      navigate("/login");
      return;
    }

    const role = localStorage.getItem("role");

    setRole(role);
  });

  return (
    <header className="header">
      <button className="header__btn" onClick={() => navigate(-1)}>
        Voltar
      </button>

      <nav className="header__nav">
        <Link
          className="header__nav__item"
          to={role === "admin" ? "/admin/menu" : "/menu"}
        >
          Menu
        </Link>
        {role === "admin" && (
          <Link className="header__nav__item" to="/admin/payments">
            Pagamentos
          </Link>
        )}
        {role === "admin" && (
          <Link className="header__nav__item" to="/admin/categories">
            Categorias
          </Link>
        )}
        {role === "admin" && (
          <Link className="header__nav__item" to="/admin/events">
            Eventos
          </Link>
        )}
      </nav>
    </header>
  );
}
