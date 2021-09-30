const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    Guild: {
     type: String,
     required: true
    },
    User: {
     type: String,
     required: true
    },
    XP: {
     type: Number,
     default: 0
    },
    Level: {
     type: Number,
     default: 0
    }
});

module.exports = mongoose.model(
  'level', Schema
)