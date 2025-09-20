import { Router } from "express";
import {
  getAllPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
} from "../controllers/paymentController.js";

//middleware de autenticacao de admin
import { isAdmin } from "../middleware/adminMiddleware.js";

//cria o roteador
export const paymentRouter = Router();

//rota get que retorna os metodos de pagamento
paymentRouter.get("/", getAllPaymentMethods);
//rota post para cadastro dos metodos de pagamento
paymentRouter.post("/", isAdmin, createPaymentMethod);
//rota update para atualizar um metodo de pagamento
paymentRouter.put("/:id", isAdmin, updatePaymentMethod);
//rota delete para apagar um metodo de pagamento
paymentRouter.delete("/:id", isAdmin, deletePaymentMethod);
