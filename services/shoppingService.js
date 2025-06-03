const db = require('../config/database');

const getAllShoppingItems = async (userId) => {
  try {
    const result = await db.query('SELECT * FROM shopping_items WHERE user_id = $1 ORDER BY created_at ASC', [userId]);
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter itens de compra: ' + error.message);
  }
};

const getShoppingItemById = async (id, userId) => {
  try {
    const result = await db.query('SELECT * FROM shopping_items WHERE id = $1 AND user_id = $2', [id, userId]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter item de compra: ' + error.message);
  }
};

const createShoppingItem = async (userId, item_name, quantity = 1, category, status = 'pendente') => {
  try {
    const result = await db.query(
      'INSERT INTO shopping_items (user_id, item_name, quantity, category, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, item_name, quantity, category, status]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar item de compra: ' + error.message);
  }
};

const updateShoppingItem = async (id, userId, item_name, quantity, category, status) => {
  try {
    const result = await db.query(
      'UPDATE shopping_items SET item_name = $1, quantity = $2, category = $3, status = $4 WHERE id = $5 AND user_id = $6 RETURNING *',
      [item_name, quantity, category, status, id, userId]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar item de compra: ' + error.message);
  }
};

const deleteShoppingItem = async (id, userId) => {
  try {
    const result = await db.query('DELETE FROM shopping_items WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar item de compra: ' + error.message);
  }
};

module.exports = {
  getAllShoppingItems,
  getShoppingItemById,
  createShoppingItem,
  updateShoppingItem,
  deleteShoppingItem
};