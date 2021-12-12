
const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
  User: { type: String },
  Guild: { type: String },
  XP: { type: Number, default: 0 },
  Level: { type: Number, default: 0 },
  LastUpdated: { type: Date, default: new Date() }
});

module.exports = mongoose.model('level', LevelSchema);
