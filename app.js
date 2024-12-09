  const express = require('express');

  const tasksRouter = require('./routes/tasks.routes');
  const storiesRouter = require('./routes/stories.routes');
  const usersRouter = require('./routes/users.routes');
  const epicsRouter = require('./routes/epics.routes');
  const projectsRouter = require('./routes/projects.routes');
  const connectDB = require('./db');
  const app = express();
  app.use(express.json());

  // Conectar a MongoDB
  connectDB();

  // Middleware para parsear JSON
  app.use(express.json());

  // Configurar rutas
  app.use('/tasks', tasksRouter);
  app.use('/stories', storiesRouter);
  app.use('/users', usersRouter);
  app.use('/epics', epicsRouter);
  app.use('/projects', projectsRouter);

  // Iniciar servidor
  app.listen(3000, () => {
    console.log("Server is Ready! 🫡");
  });
