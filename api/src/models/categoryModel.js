import { connection } from "../config/db.js";

//modelo para buscar todos as categorias cadastradas
export async function getCategories() {
  const [rows] = await connection.query(
    `SELECT id_category, category_name, category_description FROM categories WHERE category_status = 1;`
  );
  return rows;
}

//modelo para adicionar uma nova categoria no banco
export async function createCategory(name, description) {
  const [result] = await connection.query(
    `INSERT INTO categories (category_name, category_description) VALUES (?, ?);`,
    [name, description]
  );
  return { id: result.insertId };
}

//modelo para atualizar uma categoria
export async function updateCategory(id, name, description) {
  const [result] = await connection.query(
    `UPDATE categories SET category_name = ?, category_description = ? WHERE id_category = ?;`,
    [name, description, id]
  );
  return { affectedRows: result.affectedRows };
}

//modelo para desativar uma categoria
export async function deleteCategory(id) {
  const [result] = await connection.query(
    `UPDATE categories SET category_status = 0 WHERE id_category = ?;`,
    [id]
  );
  return { affectedRows: result.affectedRows };
}

//modelo para buscar categoria com base no nome
export async function findCategoryByName(name) {
  const [rows] = await connection.query(
    `SELECT * FROM categories WHERE category_name = ?;`,
    [name]
  );
  return rows[0];
}

//modelo para buscar categoria com base no id
export async function findCategoryById(id) {
  const [rows] = await connection.query(
    `SELECT * FROM categories WHERE id_category = ?;`,
    [id]
  );
  return rows[0];
}
