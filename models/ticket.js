const mongoose = require("mongoose")
require("dotenv").config();


let Schema = new mongoose.Schema({
   Guild: String,
   User: String,
   Code: String,
   Channel: String,
   Timestamp: String
})

module.exports = mongoose.model('tickets', Schema)