import { Router } from "express";
import { getGiftsByEvent, createGift } from "../controllers/giftController.js";

//middleware de autenticacao de admin
import { isAdmin } from "../middleware/adminMiddleware.js";

//cria o roteador
export const giftRouter = Router();

//rota get que retorna os presentes do evento escolhido
giftRouter.get("/:id", getGiftsByEvent);

//rota post para cadastrar um presente (apenas admin)
giftRouter.post("/", isAdmin, createGift);
