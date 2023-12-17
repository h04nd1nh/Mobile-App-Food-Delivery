const mongoose = require("mongoose");

const variationSchema = new mongoose.Schema({
  key: { type: String, required: true },
  option: { type: String, required: true },
  prices_add: { type: Number, default: 0 },
});

const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  price_primary: { type: Number, required: true },
  variation_name: { type: String, required: true },
  variations: [variationSchema],
});

const userSchema = new mongoose.Schema({
  phone: {  type: String, required: true },
  firstName: {  type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true},
  token: { type: String,default: null}
});


const cateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  productIds: [String]
});

const itemSchema = new mongoose.Schema({
  itemId: { type: String, required: true },
  variation: { type: String, default: null},
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  userID: { type: String, required: true},
  orderId: { type: String, required: true},
  time: { type: String, required:true},
  orderStatus: {type: String, require: true},
  items: [itemSchema],
});


const cartSchema = new mongoose.Schema({
  userID: { type: String, required: true},
  items: [itemSchema],
});



let Food = mongoose.model("Food", foodSchema, "Food");
let User = mongoose.model("User", userSchema, "users");
let Category = mongoose.model("Category", cateSchema, "categories");
let Order = mongoose.model("Order", orderSchema, "orders");
let Cart = mongoose.model("Cart", cartSchema, "carts");


module.exports = { Food, User, Category, Order, Cart};