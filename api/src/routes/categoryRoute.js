import { Router } from "express";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

//middleware de autenticacao de admin
import { isAdmin } from "../middleware/adminMiddleware.js";

//cria o roteador
export const categoryRouter = Router();

//rota get que retorna as categorias
categoryRouter.get("/", getAllCategories);
//rota post para cadastro das categorias
categoryRouter.post("/", isAdmin, createCategory);
//rota update para atualizar uma categoria
categoryRouter.put("/:id", isAdmin, updateCategory);
//rota delete para apagar uma categoria
categoryRouter.delete("/:id", isAdmin, deleteCategory);
