const db = require('../config/database');

const getAllNotes = async (userId) => {
  try {
    const result = await db.query('SELECT * FROM notes WHERE user_id = $1 ORDER BY created_at ASC', [userId]);
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter notas: ' + error.message);
  }
};

const getNoteById = async (id, userId) => {
  try {
    const result = await db.query('SELECT * FROM notes WHERE id = $1 AND user_id = $2', [id, userId]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter nota: ' + error.message);
  }
};

const createNote = async (userId, title, content, category) => {
  try {
    const result = await db.query(
      'INSERT INTO notes (user_id, title, content, category) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, title, content, category]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar nota: ' + error.message);
  }
};

const updateNote = async (id, userId, title, content, category) => {
  try {
    const result = await db.query(
      'UPDATE notes SET title = $1, content = $2, category = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
      [title, content, category, id, userId]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar nota: ' + error.message);
  }
};

const deleteNote = async (id, userId) => {
  try {
    const result = await db.query('DELETE FROM notes WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
    return result.rows[0];
  } catch {
    throw new Error('Erro ao deletar nota: ' + error.message);
  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
};