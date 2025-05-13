require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log(`[${new Date().toISOString()}] Attempting to connect to MongoDB...`);
    
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      tls: true,
    });

    console.log(`[${new Date().toISOString()}] Database is connected`);

    mongoose.connection.on('connected', () => {
      console.log(`[${new Date().toISOString()}] MongoDB connected`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn(`[${new Date().toISOString()}] MongoDB disconnected`);
    });

    mongoose.connection.on('error', (err) => {
      console.error(`[${new Date().toISOString()}] MongoDB error:`, err);
    });

  } catch (err) {
    console.error(`[${new Date().toISOString()}] MongoDB connection failed:`, err.message);
    process.exit(1); // Exit the app on connection failure
  }
};

const gracefulShutdown = async () => {
  console.log('Gracefully shutting down...');
  await mongoose.connection.close();
  process.exit(0);
};

process.on('SIGINT', gracefulShutdown); 
process.on('SIGTERM', gracefulShutdown);

module.exports = connectDB;
