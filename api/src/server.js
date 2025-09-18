import express from "express";
import cors from "cors";

//importando a porta do servidor
import { PORT } from "./config/config";

//criando o servidor
const app = express();

//middlewares de configuração do servidor
app.use(express.json());
app.use(cors());

//rota de teste
app.get("/", (req, res) => {
  res.send("Servidor rodando!");
});

//iniciando o servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

//tratando erros
server.on("error", (err) => {
  console.error("Ocorreu um erro no servidor:", err);
});
