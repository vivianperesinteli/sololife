const express = require('express');
const router = express.Router();
const shoppingController = require('../controllers/shoppingController');

router.get('/', shoppingController.getAllShoppingItems);
router.get('/:id', shoppingController.getShoppingItemById);
router.post('/', shoppingController.createShoppingItem);
router.put('/:id', shoppingController.updateShoppingItem);
router.delete('/:id', shoppingController.deleteShoppingItem);

module.exports = router;