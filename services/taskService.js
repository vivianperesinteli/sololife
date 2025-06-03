const db = require('../config/database');

const getAllTasks = async (userId) => {
  try {
    const result = await db.query('SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at ASC', [userId]);
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter tarefas: ' + error.message);
  }
};

const getTaskById = async (id, userId) => {
  try {
    const result = await db.query('SELECT * FROM tasks WHERE id = $1 AND user_id = $2', [id, userId]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter tarefa: ' + error.message);
  }
};

const createTask = async (userId, title, description, task_date, task_time, status = 'pendente') => {
  try {
    const result = await db.query(
      'INSERT INTO tasks (user_id, title, description, task_date, task_time, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [userId, title, description, task_date, task_time, status]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar tarefa: ' + error.message);
  }
};

const updateTask = async (id, userId, title, description, task_date, task_time, status) => {
  try {
    const result = await db.query(
      'UPDATE tasks SET title = $1, description = $2, task_date = $3, task_time = $4, status = $5 WHERE id = $6 AND user_id = $7 RETURNING *',
      [title, description, task_date, task_time, status, id, userId]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar tarefa: ' + error.message);
  }
};

const deleteTask = async (id, userId) => {
  try {
    const result = await db.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar tarefa: ' + error.message);
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};