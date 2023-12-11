const { User, Order, Cart } = require("../model/model");
const crypto = require('crypto');

const userController = {
  // Signup
  signupHandle: async (req, res) => {
    const phone = req.body.phone;
    try {
      const user = await User.findOne({
        phone: phone,
      });

      if (user) {
        // User found
        res.status(404).json({ message: "This phone number has already been registered" });
      } else {
        // User does not exis
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).json({ message: "Success" });
      }

    } catch (err) {
      res.status(500).json(err);
    }
  },

  // login Handler
  loginHandle: async (req, res) => {
    const phone = req.body.phone;
    const password = req.body.password;
    console.log(phone, password);

    try {
      const user = await User.findOne({
        phone: phone,
        password: password,
      });

      if (user) {
        // User found
        const Token = crypto.randomBytes(32).toString('hex');
        user.token = Token;
        await user.save();
        res.status(200).json({ message: "Success" ,token: Token });
      } else {
        // User does not exis
        res.status(404).json({ message: "Failed" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get User
  getUser: async (req, res) => {
    try {
      const user = await User.findOne({
        token: req.query.token,
      });
      if (user) {
        // User found
        res.status(200).json(user);
      } else {
        // User does not exis
        res.status(404).json({ message: "User does not exist" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get Order 
  getOrder: async (req, res) => {

    try {
      const user = await User.findOne({
        token: req.query.token,
      });
      if (user) {
        // User found
        const order = await Order.find({
          userID: user._id.toString(),
        })
        console.log(user._id.toString());
        if (!order.length == 0)  {
          res.status(200).json(order);
        } else {
          res.status(404).json({ message: "The user has no orders" });
        }

      } else {
        // User does not exis
        res.status(404).json({ message: "User does not exist" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //get Cart 
  getCart: async (req, res) => {

    try {
      const user = await User.findOne({
        token: req.query.token,
      });
      if (user) {
        // User found
        const cart = await Cart.find({
          userID: user._id.toString(),
        })
        console.log(user._id.toString());
        if (!cart.length == 0) {

          const data = [];
          var itemNumber = 1;
          cart[0].items.forEach((item) => {
            data.push({
              id: itemNumber,
              name: item.itemName,
              variation: item.variation,
              quantity: item.quantity,
              price: item.price
            })
            itemNumber+=1;
          })

          res.status(200).json(data);
        } else {
          res.status(404).json({ message: "The Cart user has no items" });
        }

      } else {
        // User does not exis
        res.status(404).json({ message: "User does not exist" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = userController;
