const mongoose = require("mongoose")

const chatBotChannel = new mongoose.Schema({
  Guild: String,
  Channel: String
})

module.exports = mongoose.model('chat-bot', chatBotChannel)