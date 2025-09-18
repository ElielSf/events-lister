import { connection } from "../config/db";

//modelo para buscar o usuario no banco de dados
export async function findByCPF(cpf) {
  const [rows] = await connection.query(
    `SELECT u.id_user, u.user_name, u.user_password, r.role_name AS role
  FROM users u
  JOIN roles r ON u.roles_id_role = r.id_role
  WHERE u.user_cpf = ?;`,
    [cpf]
  );
  return rows[0];
}
