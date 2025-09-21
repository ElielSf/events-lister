//importando componentes
import AdminCreatePayment from "../../components/AdminCreatePayment/AdminCreatePayment.jsx";

//css
import "./css/AdminCreatePayment.css";

//exportando pagina que cria os pagamentos do admin
export default function AdminCreatePaymentPage() {
  return (
    <div className="admin-create-payment-page">
      <AdminCreatePayment />
    </div>
  );
}
