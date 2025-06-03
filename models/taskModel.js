const db = require('../config/database');

class Task {
  static async getAll(userId) {
    try {
      const result = await db.query('SELECT id, user_id, title, description, task_date, task_time, status, created_at FROM tasks WHERE user_id = $1', [userId]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar todas as tarefas:', error);
      throw error;
    }
  }

  static async getById(id, userId) {
    try {
      const result = await db.query('SELECT id, user_id, title, description, task_date, task_time, status, created_at FROM tasks WHERE id = $1 AND user_id = $2', [id, userId]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao buscar tarefa por ID:', error);
      throw error;
    }
  }

  static async create(userId, title, description, task_date, task_time, status = 'pendente') {
    try {
      console.log('Criando tarefa com dados:', { userId, title, description, task_date, task_time, status });
      const result = await db.query(
        'INSERT INTO tasks (user_id, title, description, task_date, task_time, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, user_id, title, description, task_date, task_time, status, created_at',
        [userId, title, description, task_date, task_time, status]
      );
      console.log('Tarefa criada no banco:', result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      throw error;
    }
  }

  static async update(id, userId, title, description, task_date, task_time, status) {
    try {
      const result = await db.query(
        'UPDATE tasks SET title = $1, description = $2, task_date = $3, task_time = $4, status = $5 WHERE id = $6 AND user_id = $7 RETURNING id, user_id, title, description, task_date, task_time, status, created_at',
        [title, description, task_date, task_time, status, id, userId]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      throw error;
    }
  }

  static async delete(id, userId) {
    try {
      const result = await db.query('DELETE FROM tasks WHERE id = $1 AND user_id = $2', [id, userId]);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      throw error;
    }
  }
}

module.exports = {
  getAllTasks: Task.getAll,
  getTaskById: Task.getById,
  createTask: Task.create,
  updateTask: Task.update,
  deleteTask: Task.delete
};