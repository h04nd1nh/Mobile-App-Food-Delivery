const router = require('express').Router();
const foodController = require('../controllers/FoodController');


router.get("/", foodController.getAllFood);
router.get("/id", foodController.getFood);

module.exports = router;