import { connection } from "../config/db.js";

//modelo para atribuir o anfitriao ao evento
export async function eventHost(cpf, event_id) {
  const [result] = await connection.query(
    `INSERT INTO users_has_events (users_id_user, events_id_event, is_host) SELECT u.id_user, ?, 1 FROM users u WHERE u.user_cpf = ?;`,
    [event_id, cpf]
  );
  return { affectedRows: result.affectedRows };
}
