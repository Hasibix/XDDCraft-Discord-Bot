const mongoose = require("mongoose")
require("dotenv").config();


let Schema = new mongoose.Schema({
   Guild: String,
   Roles: String,
   Roles2: String,
   Non_VerifyRole: String
})

module.exports = mongoose.model('captcha-role', Schema)