const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');
const upload = require('../middleware/upload');

// Routes
router.get('/', mealController.getAllMeals);
router.get('/:id', mealController.getMealById);
router.post('/', upload.single('image'), mealController.createMeal);
router.put('/:id', upload.single('image'), mealController.updateMeal);
router.delete('/:id', mealController.deleteMeal);

module.exports = router;