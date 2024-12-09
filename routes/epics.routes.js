/*const express = require('express');
const epics = require('../data/epics');
const router = express.Router();
const stories = require('../data/stories');


router.get('/', (req, res) => {
  res.status(200).json(epics);
});

router.get('/:_id', (req, res) => {
  const epic = epics.find((e) => e._id === req.params._id);
  if (!epic) {
    return res.status(404).json({ message: "Epic not found" });
  }
  res.status(200).json(epic);
});

router.get('/:_id/stories',
    (req, res) => {
   res.status(200).json(
       stories.filter(
           story => story.epic === req.params._id)
   )
}

)

module.exports = router; */ 

const express = require('express');
const Epic = require('../models/Epic'); // Importa el modelo de Epic
const router = express.Router();

// Obtener todas las épicas
router.get('/', async (req, res) => {
  try {
    const epics = await Epic.find().populate('project'); // Obtiene todas las épicas y llena el campo project
    res.status(200).json(epics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching epics', error });
  }
});

// Obtener una épica específica
router.get('/:_id', async (req, res) => {
  try {
    const epic = await Epic.findById(req.params._id).populate('project');
    if (!epic) return res.status(404).json({ message: 'Epic not found' });
    res.status(200).json(epic);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching epic', error });
  }
});

// Obtener historias relacionadas con una épica
router.get('/:_id/stories', async (req, res) => {
  try {
    const stories = await Story.find({ epic: req.params._id });
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stories', error });
  }
});

module.exports = router;

