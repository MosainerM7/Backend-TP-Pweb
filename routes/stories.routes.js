/*const express = require('express');
const stories = require('../data/stories');
const tasks = require('../data/tasks');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json(stories);
});

router.get('/:_id', (req, res) => {
  const story = stories.find((s) => s.id === req.params._id);
  if (!story) {
    return res.status(404).json({ message: "Story not found" });
  }
  res.status(200).json(story);
});

router.get('/:_id/tasks', (req, res) => {
  const storyTasks = tasks.filter((task) => task.story === req.params._id);
  res.status(200).json(storyTasks);
});
module.exports = router; */

const express = require('express');
const Story = require('../models/Story'); // Importa el modelo de Story
const router = express.Router();

// Obtener todas las historias
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find().populate('epic'); // Llena el campo epic
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stories', error });
  }
});

// Obtener una historia específica
router.get('/:_id', async (req, res) => {
  try {
    const story = await Story.findById(req.params._id).populate('epic');
    if (!story) return res.status(404).json({ message: 'Story not found' });
    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching story', error });
  }
});

// Obtener tareas relacionadas con una historia
router.get('/:_id/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({ story: req.params._id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
});

module.exports = router;

