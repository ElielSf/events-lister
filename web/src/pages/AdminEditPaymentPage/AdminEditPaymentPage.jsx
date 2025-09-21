//importando componentes
import AdminEditPayment from "../../components/AdminEditPayment/AdminEditPayment.jsx";

//css
import "./css/AdminEditPayment.css";

//exportando pagina que atualiza os pagamentos do admin
export default function AdminEditPaymentPage() {
  return (
    <div className="admin-edit-payment-page">
      <AdminEditPayment />
    </div>
  );
}
