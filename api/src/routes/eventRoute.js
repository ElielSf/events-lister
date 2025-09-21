import { Router } from "express";
import {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

//middleware de autenticacao de admin
import { isAdmin } from "../middleware/adminMiddleware.js";

//cria o roteador
export const eventRouter = Router();

//rota get que retorna os eventos
eventRouter.get("/", getAllEvents);
//rota post para cadastro dos eventos
eventRouter.post("/", isAdmin, createEvent);
//rota update para atualizar um evento
eventRouter.put("/:id", isAdmin, updateEvent);
//rota delete para apagar um evento
eventRouter.delete("/:id", isAdmin, deleteEvent);
