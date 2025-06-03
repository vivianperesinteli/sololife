const db = require('../config/database');

const getAllMealPlans = async (userId) => {
  try {
    const result = await db.query('SELECT * FROM meal_plans WHERE user_id = $1 ORDER BY created_at ASC', [userId]);
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter planos de refeição: ' + error.message);
  }
};

const getMealPlanById = async (id, userId) => {
  try {
    const result = await db.query('SELECT * FROM meal_plans WHERE id = $1 AND user_id = $2', [id, userId]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter plano de refeição: ' + error.message);
  }
};

const createMealPlan = async (userId, plan_date, meal_type, description) => {
  try {
    const result = await db.query(
      'INSERT INTO meal_plans (user_id, plan_date, meal_type, description) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, plan_date, meal_type, description]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar plano de refeição: ' + error.message);
  }
};

const updateMealPlan = async (id, userId, plan_date, meal_type, description) => {
  try {
    const result = await db.query(
      'UPDATE meal_plans SET plan_date = $1, meal_type = $2, description = $3 WHERE id = $4 AND user_id = $5 RETURNING *',
      [plan_date, meal_type, description, id, userId]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar plano de refeição: ' + error.message);
  }
};

const deleteMealPlan = async (id, userId) => {
  try {
    const result = await db.query('DELETE FROM meal_plans WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar plano de refeição: ' + error.message);
  }
};

module.exports = {
  getAllMealPlans,
  getMealPlanById,
  createMealPlan,
  updateMealPlan,
  deleteMealPlan
};