const mongoose = require("mongoose");
require("dotenv").config();


let Schema = new mongoose.Schema({
   id: String,
   items: Array
});

module.exports = mongoose.model('inv', Schema);