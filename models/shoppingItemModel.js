const db = require('../config/database');

class ShoppingItem {
  static async getAll(userId) {
    try {
      const result = await db.query('SELECT id, user_id, item_name, quantity, category, status, created_at FROM shopping_items WHERE user_id = $1', [userId]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar todos os itens de compra:', error);
      throw error;
    }
  }

  static async getById(id, userId) {
    try {
      const result = await db.query('SELECT id, user_id, item_name, quantity, category, status, created_at FROM shopping_items WHERE id = $1 AND user_id = $2', [id, userId]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao buscar item de compra por ID:', error);
      throw error;
    }
  }

  static async create(userId, item_name, quantity = 1, category, status = 'pendente') {
    try {
      console.log('Criando item de compra com dados:', { userId, item_name, quantity, category, status });
      const result = await db.query(
        'INSERT INTO shopping_items (user_id, item_name, quantity, category, status) VALUES ($1, $2, $3, $4, $5) RETURNING id, user_id, item_name, quantity, category, status, created_at',
        [userId, item_name, quantity, category, status]
      );
      console.log('Item de compra criado no banco:', result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar item de compra:', error);
      throw error;
    }
  }

  static async update(id, userId, item_name, quantity, category, status) {
    try {
      const result = await db.query(
        'UPDATE shopping_items SET item_name = $1, quantity = $2, category = $3, status = $4 WHERE id = $5 AND user_id = $6 RETURNING id, user_id, item_name, quantity, category, status, created_at',
        [item_name, quantity, category, status, id, userId]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao atualizar item de compra:', error);
      throw error;
    }
  }

  static async delete(id, userId) {
    try {
      const result = await db.query('DELETE FROM shopping_items WHERE id = $1 AND user_id = $2', [id, userId]);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Erro ao deletar item de compra:', error);
      throw error;
    }
  }
}

module.exports = {
  getAllShoppingItems: ShoppingItem.getAll,
  getShoppingItemById: ShoppingItem.getById,
  createShoppingItem: ShoppingItem.create,
  updateShoppingItem: ShoppingItem.update,
  deleteShoppingItem: ShoppingItem.delete
};