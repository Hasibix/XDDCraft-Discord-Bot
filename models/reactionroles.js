const mongoose = require("mongoose")
require("dotenv").config();


let Schema = new mongoose.Schema({
   Guild: String,
   Channel: String,
   Message: String,
   Role: String,
   Emoji: String,
   DM: Boolean
})

module.exports = mongoose.model('reaction-role', Schema)