const noteService = require('../services/noteService');

const getAllNotes = async (req, res) => {
  try {
    const { user_id } = req.body;
    const notes = await noteService.getAllNotes(user_id);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNoteById = async (req, res) => {
  try {
    const { user_id } = req.body;
    const note = await noteService.getNoteById(req.params.id, user_id);
    if (note) {
      res.status(200).json(note);
    } else {
      res.status(404).json({ error: 'Nota não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createNote = async (req, res) => {
  try {
    const { user_id, title, content, category } = req.body;
    const newNote = await noteService.createNote(user_id, title, content, category);
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const { user_id, title, content, category } = req.body;
    const updatedNote = await noteService.updateNote(req.params.id, user_id, title, content, category);
    if (updatedNote) {
      res.status(200).json(updatedNote);
    } else {
      res.status(404).json({ error: 'Nota não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { user_id } = req.body;
    const deletedNote = await noteService.deleteNote(req.params.id, user_id);
    if (deletedNote) {
      res.status(200).json(deletedNote);
    } else {
      res.status(404).json({ error: 'Nota não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
};