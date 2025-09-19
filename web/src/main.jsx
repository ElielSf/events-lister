//importacoes nativas
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

//libs
import { ToastContainer } from "react-toastify";

//contextos
import { ToastProvider } from "./contexts/ToastContext";

//componentes
import App from "./App.jsx";

//css
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider>
      <ToastContainer />
      <App />
    </ToastProvider>
  </StrictMode>
);
