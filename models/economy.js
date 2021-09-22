const mongoose = require("mongoose");
const Schema = new mongoose.Schema({
    id: String,
    coins: Number
});

module.exports = mongoose.model(
  'Money', Schema
)