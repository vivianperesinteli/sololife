const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const taskRoutes = require('./taskRoutes');
const shoppingRoutes = require('./shoppingRoutes');
const noteRoutes = require('./noteRoutes');
const mealPlanRoutes = require('./mealPlanRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/tasks', taskRoutes);
router.use('/shopping', shoppingRoutes);
router.use('/notes', noteRoutes);
router.use('/meal-plans', mealPlanRoutes);

module.exports = router;