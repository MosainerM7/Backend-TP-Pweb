const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: String }], // Array de IDs de usuarios o nombres
  icon: { type: String, default: null },
});

module.exports = mongoose.model('Project', projectSchema);
