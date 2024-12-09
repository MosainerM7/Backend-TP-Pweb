const mongoose = require('mongoose');
const Project = require('./models/Projects');
const Epic = require('./models/Epic');
const Story = require('./models/Story');
const Task = require('./models/Task');
const User = require('./models/Users'); // Importar el modelo de User

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://Martin:1234@cluster0.op4ig.mongodb.net/manos-a-la-obra-2');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  await connectDB();

  try {
    // Limpia las colecciones antes de insertar datos nuevos
    await Project.deleteMany();
    await Epic.deleteMany();
    await Story.deleteMany();
    await Task.deleteMany();
    await User.deleteMany(); // Limpiar la colección de usuarios también

    // Inserta los usuarios
    const users = await User.insertMany([
      { name: 'User 1', email: 'user1@example.com', password: 'password1' },
      { name: 'User 2', email: 'user2@example.com', password: 'password2' },
    ]);

    // Inserta los proyectos
    const projects = await Project.insertMany([
      { name: 'Project 1', description: 'This is my first project', members: [users[0]._id], icon: null },
      { name: 'Project 2', description: 'This is my second project', members: [users[1]._id], icon: null },
    ]);

    // Inserta las épicas relacionadas con los proyectos
    const epics = await Epic.insertMany([
      { name: 'Epic 1', description: 'This is the first epic', project: projects[0]._id },
      { name: 'Epic 2', description: 'This is the second epic', project: projects[0]._id },
      { name: 'Epic 3', description: 'This is the third epic', project: projects[1]._id },
    ]);

    // Inserta las historias relacionadas con las épicas
    const stories = await Story.insertMany([
      { name: 'Story 1', description: 'This is the first story', epic: epics[0]._id },
      { name: 'Story 2', description: 'This is the second story', epic: epics[0]._id },
      { name: 'Story 3', description: 'This is the third story', epic: epics[1]._id },
    ]);

    // Inserta las tareas relacionadas con las historias
    const tasks = await Task.insertMany([
      { name: 'Task 1', description: 'This is task 1', done: false, story: stories[0]._id },
      { name: 'Task 2', description: 'This is task 2', done: true, story: stories[1]._id },
      { name: 'Task 3', description: 'This is task 3', done: false, story: stories[2]._id },
    ]);

    console.log('Data seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
