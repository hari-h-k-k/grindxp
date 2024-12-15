const mongoose = require('mongoose');
const databaseConfig = require('../config/mongo.database.config');

const connectDB = async () => {
  try {
    console.log(databaseConfig.uri)
    await mongoose.connect(databaseConfig.uri);
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error.message);
    process.exit(1); // Exit the process with an error code
  }
};

module.exports = connectDB;
