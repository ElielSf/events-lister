//importacao nativa
import { useContext } from "react";

//importando o contexto de notificações
import ToastContext from "../contexts/ToastContext";

//hook personalizado para usar o contexto
const useToast = () => useContext(ToastContext);

//exportando o hook
export default useToast;
