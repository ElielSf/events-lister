import { connection } from "../config/db.js";

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

//modelo para criar um novo usuario no banco(convidado por padrao)
export async function createUser(name, cpf, password_hash, phone, email) {
  const [result] = await connection.query(
    `INSERT INTO users (user_name, user_cpf, user_password, user_phone, user_email) VALUES (?, ?, ?, ?, ?);`,
    [name, cpf, password_hash, phone, email]
  );
  return { id: result.insertId };
}
