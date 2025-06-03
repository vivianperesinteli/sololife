const db = require('../config/database');

class Note {
  static async getAll(userId) {
    try {
      const result = await db.query('SELECT id, user_id, title, content, category, created_at FROM notes WHERE user_id = $1', [userId]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar todas as notas:', error);
      throw error;
    }
  }

  static async getById(id, userId) {
    try {
      const result = await db.query('SELECT id, user_id, title, content, category, created_at FROM notes WHERE id = $1 AND user_id = $2', [id, userId]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao buscar nota por ID:', error);
      throw error;
    }
  }

  static async create(userId, title, content, category) {
    try {
      console.log('Criando nota com dados:', { userId, title, content, category });
      const result = await db.query(
        'INSERT INTO notes (user_id, title, content, category) VALUES ($1, $2, $3, $4) RETURNING id, user_id, title, content, category, created_at',
        [userId, title, content, category]
      );
      console.log('Nota criada no banco:', result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar nota:', error);
      throw error;
    }
  }

  static async update(id, userId, title, content, category) {
    try {
      const result = await db.query(
        'UPDATE notes SET title = $1, content = $2, category = $3 WHERE id = $4 AND user_id = $5 RETURNING id, user_id, title, content, category, created_at',
        [title, content, category, id, userId]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao atualizar nota:', error);
      throw error;
    }
  }

  static async delete(id, userId) {
    try {
      const result = await db.query('DELETE FROM notes WHERE id = $1 AND user_id = $2', [id, userId]);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Erro ao deletar nota:', error);
      throw error;
    }
  }
}

module.exports = {
  getAllNotes: Note.getAll,
  getNoteById: Note.getById,
  createNote: Note.create,
  updateNote: Note.update,
  deleteNote: Note.delete
};