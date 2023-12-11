const router = require('express').Router();
const cateController = require('../controllers/CategoryController');


router.get("/", cateController.getAllCate);

module.exports = router;