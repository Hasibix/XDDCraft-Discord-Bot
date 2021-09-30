const mongoose = require("mongoose")
require("dotenv").config();


let Schema = new mongoose.Schema({
   Guild: String,
   User: String,
   Mutes: Object,
   MuteReasons: Object
})

module.exports = mongoose.model('mute-role', Schema)