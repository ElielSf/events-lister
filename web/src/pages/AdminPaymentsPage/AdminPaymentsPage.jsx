//importando componentes
import AdminPayments from "../../components/AdminPayments/AdminPayments.jsx";

//css
import "./css/AdminPayments.css";

//exportando pagina de controle dos metodos de pagamento do admin
export default function AdminMenuPage() {
  return (
    <div className="admin-payments-page">
      <AdminPayments />
    </div>
  );
}
