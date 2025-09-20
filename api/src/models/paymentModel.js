import { connection } from "../config/db.js";

//modelo para buscar todos os pagamentos cadastrados
export async function getPayments() {
  const [rows] = await connection.query(
    `SELECT id_payment_m, payment_m_name FROM payment_methods WHERE payment_m_status = 1;`
  );
  return rows;
}

//modelo para adicionar um novo metodo de pagamento no banco
export async function createPayment(name) {
  const [result] = await connection.query(
    `INSERT INTO payment_methods (payment_m_name) VALUES (?);`,
    [name]
  );
  return { id: result.insertId };
}

//modelo para atualizar um metodo de pagamento
export async function updatePayment(id, name) {
  const [result] = await connection.query(
    `UPDATE payment_methods SET payment_m_name = ? WHERE id_payment_m = ?;`,
    [name, id]
  );
  return { affectedRows: result.affectedRows };
}

//modelo para desativar um metodo de pagamento
export async function deletePayment(id) {
  const [result] = await connection.query(
    `UPDATE payment_methods SET payment_m_status = 0 WHERE id_payment_m = ?;`,
    [id]
  );
  return { affectedRows: result.affectedRows };
}

//modelo para buscar método de pagamento com base no nome
export async function findByName(name) {
  const [rows] = connection.query(
    `SELECT * FROM payment_methods WHERE payment_m_name = ?;`,
    [name]
  );
  return rows[0];
}

//modelo para buscar método de pagamento com base no id
export async function findById(id) {
  const [rows] = connection.query(
    `SELECT * FROM payment_methods WHERE id_payment_m = ?;`,
    [id]
  );
  return rows[0];
}
