import { createPool } from "mysql2/promise";

//importando variaveis de ambiente
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } from "./config.js";

//criando conexao com o banco
export const connection = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});


