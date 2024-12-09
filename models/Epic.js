const mongoose = require('mongoose');

const epicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' }, // Relación con Project
});

module.exports = mongoose.model('Epic', epicSchema);
