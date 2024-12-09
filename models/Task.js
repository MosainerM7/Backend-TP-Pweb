const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  done: { type: Boolean, default: false },
  story: { type: mongoose.Schema.Types.ObjectId, ref: 'Story' }, // Relación con Story
});

module.exports = mongoose.model('Task', taskSchema);
