const taskService = require('../services/taskService.js');

const getAllTasks = async (req, res) => {
  try {
    const { user_id } = req.body;
    const tasks = await taskService.getAllTasks(user_id);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { user_id } = req.body;
    const task = await taskService.getTaskById(req.params.id, user_id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { user_id, title, description, task_date, task_time, status } = req.body;
    const newTask = await taskService.createTask(user_id, title, description, task_date, task_time, status);
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { user_id, title, description, task_date, task_time, status } = req.body;
    const updatedTask = await taskService.updateTask(req.params.id, user_id, title, description, task_date, task_time, status);
    if (updatedTask) {
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { user_id } = req.body;
    const deletedTask = await taskService.deleteTask(req.params.id, user_id);
    if (deletedTask) {
      res.status(200).json(deletedTask);
    } else {
      res.status(404).json({ error: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};