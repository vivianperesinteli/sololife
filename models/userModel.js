const db = require('../config/database');

class User {
  static async getAll() {
    try {
      const result = await db.query('SELECT id, name, email FROM users');
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar todos os usuários:', error);
      throw error;
    }
  }

  static async getById(id) {
    try {
      const result = await db.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao buscar usuário por ID:', error);
      throw error;
    }
  }

  static async create(name, email, password) {
    try {
      console.log('Criando usuário com dados:', { name, email });
      const result = await db.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
        [name, email, password]
      );
      console.log('Usuário criado no banco:', result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }

  static async update(id, name, email, password) {
    try {
      const result = await db.query(
        'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING id, name, email',
        [name, email, password, id]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const result = await db.query('DELETE FROM users WHERE id = $1', [id]);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      throw error;
    }
  }
}

module.exports = {
  getAllUsers: User.getAll,
  getUserById: User.getById,
  createUser: User.create,
  updateUser: User.update,
  deleteUser: User.delete
};