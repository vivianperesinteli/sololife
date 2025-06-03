const mealPlanService = require('../services/mealPlanService');

const getAllMealPlans = async (req, res) => {
  try {
    const { user_id } = req.body;
    const mealPlans = await mealPlanService.getAllMealPlans(user_id);
    res.status(200).json(mealPlans);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMealPlanById = async (req, res) => {
  try {
    const { user_id } = req.body;
    const mealPlan = await mealPlanService.getMealPlanById(req.params.id, user_id);
    if (mealPlan) {
      res.status(200).json(mealPlan);
    } else {
      res.status(404).json({ error: 'Plano de refeição não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createMealPlan = async (req, res) => {
  try {
    const { user_id, plan_date, meal_type, description } = req.body;
    const newMealPlan = await mealPlanService.createMealPlan(user_id, plan_date, meal_type, description);
    res.status(201).json(newMealPlan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMealPlan = async (req, res) => {
  try {
    const { user_id, plan_date, meal_type, description } = req.body;
    const updatedMealPlan = await mealPlanService.updateMealPlan(req.params.id, user_id, plan_date, meal_type, description);
    if (updatedMealPlan) {
      res.status(200).json(updatedMealPlan);
    } else {
      res.status(404).json({ error: 'Plano de refeição não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMealPlan = async (req, res) => {
  try {
    const { user_id } = req.body;
    const deletedMealPlan = await mealPlanService.deleteMealPlan(req.params.id, user_id);
    if (deletedMealPlan) {
      res.status(200).json(deletedMealPlan);
    } else {
      res.status(404).json({ error: 'Plano de refeição não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMealPlans,
  getMealPlanById,
  createMealPlan,
  updateMealPlan,
  deleteMealPlan
};