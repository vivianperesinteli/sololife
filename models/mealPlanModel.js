const db = require('../config/database');

class MealPlan {
  static async getAll(userId) {
    try {
      const result = await db.query('SELECT id, user_id, plan_date, meal_type, description, created_at FROM meal_plans WHERE user_id = $1', [userId]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar todos os planos de refeição:', error);
      throw error;
    }
  }

  static async getById(id, userId) {
    try {
      const result = await db.query('SELECT id, user_id, plan_date, meal_type, description, created_at FROM meal_plans WHERE id = $1 AND user_id = $2', [id, userId]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao buscar plano de refeição por ID:', error);
      throw error;
    }
  }

  static async create(userId, plan_date, meal_type, description) {
    try {
      console.log('Criando plano de refeição com dados:', { userId, plan_date, meal_type, description });
      const result = await db.query(
        'INSERT INTO meal_plans (user_id, plan_date, meal_type, description) VALUES ($1, $2, $3, $4) RETURNING id, user_id, plan_date, meal_type, description, created_at',
        [userId, plan_date, meal_type, description]
      );
      console.log('Plano de refeição criado no banco:', result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao criar plano de refeição:', error);
      throw error;
    }
  }

  static async update(id, userId, plan_date, meal_type, description) {
    try {
      const result = await db.query(
        'UPDATE meal_plans SET plan_date = $1, meal_type = $2, description = $3 WHERE id = $4 AND user_id = $5 RETURNING id, user_id, plan_date, meal_type, description, created_at',
        [plan_date, meal_type, description, id, userId]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao atualizar plano de refeição:', error);
      throw error;
    }
  }

  static async delete(id, userId) {
    try {
      const result = await db.query('DELETE FROM meal_plans WHERE id = $1 AND user_id = $2', [id, userId]);
      return result.rowCount > 0;
    } catch (error) {
      console.error('Erro ao deletar plano de refeição:', error);
      throw error;
    }
  }
}

module.exports = {
  getAllMealPlans: MealPlan.getAll,
  getMealPlanById: MealPlan.getById,
  createMealPlan: MealPlan.create,
  updateMealPlan: MealPlan.update,
  deleteMealPlan: MealPlan.delete
};