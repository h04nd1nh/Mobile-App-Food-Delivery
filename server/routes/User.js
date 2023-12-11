const router = require('express').Router();
const userController = require('../controllers/UserController');

router.get('/' , userController.getUser);

router.post('/signup' , userController.signupHandle);

router.put('/login' , userController.loginHandle);


router.get('/order' , userController.getOrder);


module.exports = router;
