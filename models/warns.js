const mongoose = require("mongoose")
require("dotenv").config();


let Schema = new mongoose.Schema({
   guildid: String,
   user: String,
   content: Array
})

module.exports = mongoose.model('warns', Schema)