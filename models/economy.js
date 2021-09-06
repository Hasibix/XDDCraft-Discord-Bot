const mongoose = require("mongoose");
require("dotenv").config();


let Schema = new mongoose.Schema({
   id: String,
   coins: Number
});

module.exports = mongoose.model('Money', Schema);