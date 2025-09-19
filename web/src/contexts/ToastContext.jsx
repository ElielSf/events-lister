//importacao nativa
import { createContext } from "react";

//libs
import { toast, Slide } from "react-toastify";
import PropTypes from "prop-types";

//CSS das notificacoes
import "react-toastify/dist/ReactToastify.css";
import "../index.css";

//cria o contexto
const ToastContext = createContext();

//criar o provedor do contexto
export const ToastProvider = ({ children }) => {
  //configuração global das notificações
  const config = {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    theme: "light",
    transition: Slide,
  };

  //define o tipo de notificação
  const notify = (type, message) => {
    if (type === "success") toast.success(message, config);
    if (type === "warning") toast.warn(message, config);
    if (type === "error") toast.error(message, config);
  };

  return (
    <ToastContext.Provider value={{ notify }}>{children}</ToastContext.Provider>
  );
};

//validação das props com o PropTypes
ToastProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

//exportando o ToastContext como padrão
export default ToastContext;
