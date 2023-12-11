const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");



// Connect to DB
mongoose.connect("mongodb+srv://hoandinhptit02:hoandinh2002@cluster0.188urvp.mongodb.net/PChicken?retryWrites=true&w=majority")
  .then((success) => {
    console.log("Connect to MongoDB Successfully");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB");
  });

// middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("common"));

// route 

//food
app.use("/food", require("./routes/Food"));

//user 
app.use("/user", require("./routes/User"));

//category

app.use("/category", require("./routes/Category"));


app.listen(8000, () => {
  console.log("listening on port " + 8000);
});
