import express from "express";
import { login, register } from "../controllers/authController.js";

//cria o roteador
export const authRouter = express.Router();

//cria a rota para login
authRouter.post("/login", login);
//cria a rota para cadastro
authRouter.post("/register", register);
