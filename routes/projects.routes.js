/*const express = require('express');
const projects = require('../data/projects');
const epics = require('../data/epics');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json(projects);
});

router.get('/:_id', (req, res) => {
  const project = projects.find((p) => p._id === req.params._id);
  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }
  res.status(200).json(project);
});

router.get('/:_id/epics', (req, res) => {
  const projectEpics = epics.filter((epic) => epic.project === req.params._id);
  res.status(200).json(projectEpics);
});

module.exports = router;*/

const express = require('express');
const Project = require('../models/Projects'); // Importa el modelo de Project
const Epic = require('../models/Epic');
const router = express.Router();

// Obtener todos los proyectos
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
});

// Obtener un proyecto específico
router.get('/:_id', async (req, res) => {
  try {
    const project = await Project.findById(req.params._id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error });
  }
});

// Obtener épicas relacionadas con un proyecto
router.get('/:_id/epics', async (req, res) => {
  try {
    const epics = await Epic.find({ project: req.params._id });
    res.status(200).json(epics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching epics', error });
  }
});

// Crear un nuevo proyecto (POST)
router.post('/', async (req, res) => {
  const { name, description, startDate, endDate } = req.body;

  try {
    const newProject = new Project({
      name,
      description,
      startDate,
      endDate,
    });

    // Guardar el proyecto en la base de datos
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error });
  }
});

// Actualizar un proyecto existente (PUT)
router.put('/:_id', async (req, res) => {
  const { name, description, startDate, endDate } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params._id,
      { name, description, startDate, endDate },
      { new: true } // Retorna el proyecto actualizado
    );

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error });
  }
});

// Eliminar un proyecto (DELETE)
router.delete('/:_id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params._id);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Opcional: Eliminar las épicas relacionadas con el proyecto eliminado
    await Epic.deleteMany({ project: req.params._id });

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
});

module.exports = router;
