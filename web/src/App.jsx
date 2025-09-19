//lib
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//importacao das paginas
import LoginPage from "./pages/LoginPage/LoginPage.jsx";

//exportando o componente responsável por definir as rotas do frontend
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
