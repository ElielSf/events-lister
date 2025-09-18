import express from "express";
import { login } from "../controllers/authController";

//cria o roteador
export const authRouter = express.Router();

//cria a rota post para login
authRouter.post("/login", login);
