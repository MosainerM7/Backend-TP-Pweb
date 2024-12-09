const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  epic: { type: mongoose.Schema.Types.ObjectId, ref: 'Epic' }, // Relación con Epic
});

module.exports = mongoose.model('Story', storySchema);
