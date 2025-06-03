const db = require('../config/database');

class Event {
  static async getAll(userId) {
    try {
      const result = await db.query('SELECT id, user_id, title, description, event_date, event_time, created_at FROM events WHERE user_id = $1', [userId]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar todos os eventos:', error);
      throw error;
    }
  }

  static async getById(id, userId) {
    try {
      const result = await db.query('SELECT id, user_id, title, description, event_date, event_time, created_at FROM events WHERE id = $1 AND user_id = $2', [id, userId]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao buscar evento por ID:', error);
      throw error;
    }
  }

  static async create(userId, title, description, event_date, event_time) {
    try {
      console.log('Criando evento com dados:', { userId, title, description, event_date, event_time });
      const result = await db.query(
        'INSERT INTO events (user_id, title, description, event_date, event_time) VALUES ($1, $2, $3, $4, $5) RETURNING id, user_id, title, description, event_date, event_time, created_at',
        [userId, title, description, event_date, event_time]
      );
      console.log('Evento criado no banco:', result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar evento:', error);
      throw error;
    }
  }

  static async update(id, userId, title, description, event_date, event_time) {
    try {
      const result = await db.query(
        'UPDATE events SET title = $1, description = $2, event_date = $3, event_time = $4 WHERE id = $5 AND user_id = $6 RETURNING id, user_id, title, description, event_date, event_time, created_at',
        [title, description, event_date, event_time, id, userId]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao atualizar evento:', error);
      throw error;
    }
  }

  static async delete(id, userId) {
    try {
      const result = await db.query('DELETE FROM events WHERE id = $1 AND user_id = $2', [id, userId]);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
      throw error;
    }
  }
}

module.exports = {
  getAllEvents: Event.getAll,
  getEventById: Event.getById,
  createEvent: Event.create,
  updateEvent: Event.update,
  deleteEvent: Event.delete
};