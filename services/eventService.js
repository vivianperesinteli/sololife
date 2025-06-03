const db = require('../config/database');

const getAllEvents = async (userId) => {
  try {
    const result = await db.query('SELECT * FROM events WHERE user_id = $1 ORDER BY created_at ASC', [userId]);
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter eventos: ' + error.message);
  }
};

const getEventById = async (id, userId) => {
  try {
    const result = await db.query('SELECT * FROM events WHERE id = $1 AND user_id = $2', [id, userId]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter evento: ' + error.message);
  }
};

const createEvent = async (userId, title, description, event_date, event_time) => {
  try {
    const result = await db.query(
      'INSERT INTO events (user_id, title, description, event_date, event_time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, title, description, event_date, event_time]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar evento: ' + error.message);
  }
};

const updateEvent = async (id, userId, title, description, event_date, event_time) => {
  try {
    const result = await db.query(
      'UPDATE events SET title = $1, description = $2, event_date = $3, event_time = $4 WHERE id = $5 AND user_id = $6 RETURNING *',
      [title, description, event_date, event_time, id, userId]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar evento: ' + error.message);
  }
};

const deleteEvent = async (id, userId) => {
  try {
    const result = await db.query('DELETE FROM events WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar evento: ' + error.message);
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};