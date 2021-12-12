const mongoose = require("mongoose")
require("dotenv").config();


let Schema = new mongoose.Schema({
   Guild: String,
   Message: String
})

module.exports = mongoose.model('captcha', Schema)