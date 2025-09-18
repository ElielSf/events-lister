import { connection } from "../config/db";

//modelo para buscar o usuario no banco de dados
export async function findByCPF(cpf) {
  const [rows] = await connection.query("SELECT * FROM users WHERE cpf = ?", [cpf]);
  return rows[0];
}
