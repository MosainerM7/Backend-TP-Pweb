/*const express = require('express');
const tasks = require('../data/tasks');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json(tasks);
});

router.get('/:_id', (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.status(200).json(task);
});



module.exports = router; */

const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('story');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
});

module.exports = router;
