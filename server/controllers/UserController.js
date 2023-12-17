const { User, Order, Cart } = require("../model/model");
const crypto = require("crypto");

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
        res
          .status(404)
          .json({ message: "This phone number has already been registered" });
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
        const Token = crypto.randomBytes(32).toString("hex");
        user.token = Token;
        await user.save();
        res.status(200).json({ message: "Success", token: Token });
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

  //Update User 
  updateUser: async (req, res) => {

    try {
      const user = await User.findOne({
        token: req.query.token,
      });
      if (user) {
        // User found

        await User.updateOne(
          { _id: user._id.toString() },
          { $set: req.body }
        );

        res.status(200).json({ message: "Update user succesfully" });
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
        });
        console.log(user._id.toString());
        if (!order.length == 0) {
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
        });
        console.log(user._id.toString());
        if (!cart.length == 0) {
          const data = [];
          let idTemp = 1;
          cart[0].items.forEach((item) => {

            data.push({
              id: idTemp,
              _id: item.itemId,
              name: item.itemName,
              variation: item.variation,
              quantity: item.quantity,
              price: item.price,
            });
            idTemp += 1;
          });

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
  },

  // Get Cart quantity
  getCartQuantity: async (req, res) => {
    try {
      const user = await User.findOne({
        token: req.query.token,
      });
      if (user) {
        // User found
        const cart = await Cart.find({
          userID: user._id.toString(),
        });
        console.log(user._id.toString());
        if (!cart.length == 0) {
          var itemNumber = 0;
          cart[0].items.forEach(() => {
            itemNumber += 1;
          });

          res.status(200).json({ quantity: itemNumber });
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
  },

  // ADD TO CART
  addToCart: async (req, res) => {


    try {
      const item = req.body.item;
      const user = await User.findOne({
        token: req.body.token,
      });

      if (user) {
        const cart = await Cart.findOne({
          userID: user._id.toString(),
          "items.itemId": item[0].itemId,
          "items.variation": item[0].variation,
        });

        if (cart) {
          // Nếu phần tử tồn tại, cập nhật quantity
          cart.items.forEach((cartItem) => {
            if (
              cartItem.itemId === item[0].itemId &&
              cartItem.variation === item[0].variation
            ) {
              cartItem.quantity += item[0].quantity;

              // Kiểm tra nếu quantity bằng 0 thì xoá phần tử khỏi mảng
              if (cartItem.quantity === 0) {
                cart.items = cart.items.filter((item) => item.quantity !== 0);
              }
            }
          });

          await cart.save();
          res.status(200).json({ message: "Cart updated successfully", cart });
        } else {
          // Nếu không tìm thấy phần tử, thêm mới một phần tử vào mảng items
          await Cart.updateOne(
            { userID: user._id.toString() },
            {
              $push: {
                items: item[0],
              },
            },
            { upsert: true }
          );
          res.status(200).json({ message: "Cart updated successfully" });
        }
      } else {
        // User not found
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // CHECKOUT 
  checkOut: async (req, res) => {

    function generateRandomString(prefix, length) {
      const characters = '0123456789';
      let result = prefix;

      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }

      return result;
    }

    function getTime() {
      const now = new Date();
      const day = now.getDate().toString().padStart(2, '0');
      const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Lưu ý: Tháng bắt đầu từ 0
      const year = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');

      return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    try {
      const user = await User.findOne({
        token: req.body.token,
      });

      if (user) {
        const cart = await Cart.find({
          userID: user._id.toString(),
        });

        const order = {
          userID: user._id.toString(),
          orderId: generateRandomString('PP', 6),
          time: getTime(),
          orderStatus: "Đang giao hàng",
          items: [...cart[0].items]

        }
        console.log(order);
        const newOrder = new Order(order);
        await newOrder.save();
        await Cart.deleteOne({ userID: user._id.toString() });
        res.status(200).json({ message: "Success" });
      } else {
        // User not found
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = userController;
