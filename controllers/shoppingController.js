const shoppingService = require('../services/shoppingService');

const getAllShoppingItems = async (req, res) => {
  try {
    const { user_id } = req.body;
    const items = await shoppingService.getAllShoppingItems(user_id);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getShoppingItemById = async (req, res) => {
  try {
    const { user_id } = req.body;
    const item = await shoppingService.getShoppingItemById(req.params.id, user_id);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: 'Item de compra não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createShoppingItem = async (req, res) => {
  try {
    const { user_id, item_name, quantity, category, status } = req.body;
    const newItem = await shoppingService.createShoppingItem(user_id, item_name, quantity, category, status);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateShoppingItem = async (req, res) => {
  try {
    const { user_id, item_name, quantity, category, status } = req.body;
    const updatedItem = await shoppingService.updateShoppingItem(req.params.id, user_id, item_name, quantity, category, status);
    if (updatedItem) {
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({ error: 'Item de compra não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteShoppingItem = async (req, res) => {
  try {
    const { user_id } = req.body;
    const deletedItem = await shoppingService.deleteShoppingItem(req.params.id, user_id);
    if (deletedItem) {
      res.status(200).json(deletedItem);
    } else {
      res.status(404).json({ error: 'Item de compra não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllShoppingItems,
  getShoppingItemById,
  createShoppingItem,
  updateShoppingItem,
  deleteShoppingItem
};