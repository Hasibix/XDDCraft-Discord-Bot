const mongoose = require("mongoose")
require("dotenv").config();


let Schema = new mongoose.Schema({
   Guild: String,
   Role: String
})

module.exports = mongoose.model('mute-role', Schema)