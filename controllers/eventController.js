const eventService = require('../services/eventService');

const getAllEvents = async (req, res) => {
  try {
    const { user_id } = req.body;
    const events = await eventService.getAllEvents(user_id);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const { user_id } = req.body;
    const event = await eventService.getEventById(req.params.id, user_id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: 'Evento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const { user_id, title, description, event_date, event_time } = req.body;
    const newEvent = await eventService.createEvent(user_id, title, description, event_date, event_time);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { user_id, title, description, event_date, event_time } = req.body;
    const updatedEvent = await eventService.updateEvent(req.params.id, user_id, title, description, event_date, event_time);
    if (updatedEvent) {
      res.status(200).json(updatedEvent);
    } else {
      res.status(404).json({ error: 'Evento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { user_id } = req.body;
    const deletedEvent = await eventService.deleteEvent(req.params.id, user_id);
    if (deletedEvent) {
      res.status(200).json(deletedEvent);
    } else {
      res.status(404).json({ error: 'Evento não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};