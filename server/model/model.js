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



let Food = mongoose.model("Food", foodSchema, "Food");
let User = mongoose.model("User", userSchema, "users");
let Category = mongoose.model("Category", cateSchema, "categories");

module.exports = { Food, User, Category };