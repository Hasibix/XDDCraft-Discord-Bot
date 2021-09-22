const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
    Guild: String,
    User: String,
    ItemEmoji: Object,
    Inventory: Object,
});

module.exports = mongoose.model(
  'inventory', Schema
)