const router = require('express').Router();
const foodController = require('../controllers/FoodController');


router.get("/", foodController.getAllFood);

module.exports = router;