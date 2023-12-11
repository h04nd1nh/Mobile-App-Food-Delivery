const router = require('express').Router();
const userController = require('../controllers/UserController');

router.get('/' , userController.getUser);

router.post('/signup' , userController.signupHandle);

router.put('/login' , userController.loginHandle);


router.get('/order' , userController.getOrder);

router.get('/cart' , userController.getCart);


module.exports = router;
