const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MDB_CONNECTION, {
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Salir si no se conecta
  }
};

module.exports = connectDB; 

/*const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true }
).then(() => {
  console.log('Connected');
}).catch((error) => {
  console.error('The connection failed:', error);
});

module.exports = mongoose*/
