//importando componentes
import CreateGift from "../../components/CreateGift/CreateGift.jsx";

//css
import "./css/CreateGiftPage.css";

//exportando pagina que cria os presentes de um evento
export default function CreateGiftPage() {
  return (
    <div className="create-gift-page">
      <CreateGift />
    </div>
  );
}
