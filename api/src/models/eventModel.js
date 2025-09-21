import { connection } from "../config/db.js";

//modelo para buscar todos os eventos cadastrados
export async function getEvents() {
  const [rows] = await connection.query(
    `SELECT id_event, event_name, event_date, event_address, event_password, event_created_at FROM events WHERE event_status = 1;`
  );
  return rows;
}

//modelo para adicionar um novo evento no banco
export async function createEvent(name, date, address, password_hash) {
  const [result] = await connection.query(
    `INSERT INTO events (event_name, event_date, event_address, event_password_hash) VALUES (?, ?, ?, ?);`,
    [name, date, address, password_hash]
  );
  return { id: result.insertId };
}

//modelo para atualizar um evento
export async function updateEvent(id, name, date, address, password_hash) {
  const [result] = await connection.query(
    `UPDATE events SET event_name = ?, event_date = ?, event_address = ?, event_password = ? WHERE id_event = ?;`,
    [name, date, address, password_hash, id]
  );
  return { affectedRows: result.affectedRows };
}

//modelo para desativar um evento
export async function deleteEvent(id) {
  const [result] = await connection.query(
    `UPDATE events SET event_status = 0 WHERE id_event = ?;`,
    [id]
  );
  return { affectedRows: result.affectedRows };
}

// //modelo para buscar um evento com base no nome
// export async function findEventByName(name) {
//   const [rows] = await connection.query(
//     `SELECT * FROM events WHERE category_name = ?;`,
//     [name]
//   );
//   return rows[0];
// }

//modelo para buscar evento com base no id
export async function findEventById(id) {
  const [rows] = await connection.query(
    `SELECT * FROM events WHERE id_event = ?;`,
    [id]
  );
  return rows[0];
}
