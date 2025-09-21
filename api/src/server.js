import express from "express";
import cors from "cors";

//importando a porta do servidor
import { PORT } from "./config/config.js";

//importando as rotas do servidor
import { authRouter } from "./routes/authRoute.js";
import { paymentRouter } from "./routes/paymentRoute.js";
import { categoryRouter } from "./routes/categoryRoute.js";
import { eventRouter } from "./routes/eventRoute.js";

//criando o servidor
const app = express();

//middlewares de autenticacao
import { authenticateToken } from "./middleware/authMiddleware.js";
import { isAdmin } from "./middleware/adminMiddleware.js";

//middlewares de configuração do servidor
app.use(express.json());
app.use(cors());

//rota de teste
app.get("/test", (req, res) => {
  res.send("Servidor rodando!");
});

//rota de autenticacao
app.use("/auth", authRouter);

//rota dos metodos de pagamento
app.use("/payment", authenticateToken, paymentRouter);

//rota dos eventos
app.use("/payment", authenticateToken, eventRouter);

//rota das categorias
app.use("/payment", authenticateToken, categoryRouter);

//iniciando o servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

//tratando erros
server.on("error", (err) => {
  console.error("Ocorreu um erro no servidor:", err);
});
