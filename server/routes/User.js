const router = require('express').Router();
const userController = require('../controllers/UserController');

router.get('/' , userController.getUser);
router.put('/' , userController.updateUser);
router.post('/signup' , userController.signupHandle);

router.put('/login' , userController.loginHandle);


router.get('/order' , userController.getOrder);

router.get('/cart' , userController.getCart);

router.get('/cart/quantity' , userController.getCartQuantity);

router.put('/cart/update' , userController.addToCart);

router.put('/cart/checkout' , userController.checkOut);

module.exports = router;
