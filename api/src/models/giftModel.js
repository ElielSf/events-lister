import { connection } from "../config/db.js";

//modelo para buscar todos os presentes com base no id do evento
export async function getGiftsByEventId(event_id) {
  const [rows] = await connection.query(
    `SELECT id_gift, gift_name, gift_price, gift_max_limit, gift_image, gift_status FROM gifts WHERE events_id_event = ?;`,
    [event_id]
  );
  return rows;
}

//modelo para adicionar um novo presente no banco
export async function createGift(
  name,
  price,
  max_limit,
  image_buffer,
  payment_m_id,
  event_id,
  category_id
) {
  const [result] = await connection.query(
    `INSERT INTO gifts (gift_name, gift_price, gift_max_limit, gift_image, events_id_event, payment_methods_id_payment_m, categories_id_category) VALUES (?, ?, ?, ?, ?, ?, ?);`,
    [name, price, max_limit, image_buffer, event_id, payment_m_id, category_id]
  );
  return { id: result.insertId };
}
