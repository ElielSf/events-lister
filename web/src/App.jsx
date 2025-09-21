//lib
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//importacao das paginas
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.jsx";
import AdminMenuPage from "./pages/AdminMenuPage/AdminMenuPage.jsx";
import AdminPaymentsPage from "./pages/AdminPaymentsPage/AdminPaymentsPage.jsx";
import AdminCreatePaymentPage from "./pages/AdminCreatePaymentPage/AdminCreatePaymentPage.jsx";
import AdminEditPaymentPage from "./pages/AdminEditPaymentPage/AdminEditPaymentPage.jsx";

//importando a rota de verificacao de autenticacao e de admin
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import AdminRoute from "./components/AdminRoute/AdminRoute.jsx";

//exportando o componente responsável por definir as rotas do frontend
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/admin/menu"
          element={
            <AdminRoute>
              <AdminMenuPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <AdminRoute>
              <AdminPaymentsPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/payments/create"
          element={
            <AdminRoute>
              <AdminCreatePaymentPage />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/payments/edit/:id"
          element={
            <AdminRoute>
              <AdminEditPaymentPage />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}
