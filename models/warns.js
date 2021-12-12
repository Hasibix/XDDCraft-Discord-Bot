const mongoose = require("mongoose")
require("dotenv").config();


let Schema = new mongoose.Schema({
   Guild: String,
   User: String,
   Moderator: String,
   Reason: String,
   Timestamp: String
})

module.exports = mongoose.model('warns', Schema)