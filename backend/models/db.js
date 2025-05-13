require('dotenv').config();
const mongoose = require('mongoose');

let isConnecting = false;
let listenersAttached = false;
let retryCount = 0;
const maxRetries = 5;

const connectWithRetry = () => {
  if (!mongoose.connection.readyState && !isConnecting) {
    console.log(`[${new Date().toISOString()}] Attempting to connect to MongoDB...`);
    isConnecting = true;

    mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      tls: true,
    })
    .then(() => {
      console.log(`[${new Date().toISOString()}] Database is connected`);
      isConnecting = false;
      retryCount = 0; // Reset on success
    })
    .catch((err) => {
      console.error(`[${new Date().toISOString()}] Connection failed. Retrying in 10s...`, err.message);
      isConnecting = false;
      if (retryCount < maxRetries) {
        retryCount++;
        setTimeout(connectWithRetry, 10000);
      } else {
        console.error(`[${new Date().toISOString()}] Max retries reached. Giving up.`);
      }
    });

    if (!listenersAttached) {
      listenersAttached = true;

      mongoose.connection.on('connected', () => {
        console.log(`[${new Date().toISOString()}] MongoDB connected`);
      });

      mongoose.connection.on('reconnected', () => {
        console.log(`[${new Date().toISOString()}] MongoDB reconnected`);
      });

      mongoose.connection.on('disconnected', () => {
        console.warn(`[${new Date().toISOString()}] MongoDB disconnected.`);
        // Do not call connectWithRetry() here — let Mongoose handle it
      });

      mongoose.connection.on('error', (err) => {
        console.error(`[${new Date().toISOString()}] MongoDB error:`, err);
      });
    }
  }
};

// Gracefully handle shutdown
process.on('SIGINT', async () => {
  console.log('Gracefully shutting down...');
  await mongoose.connection.close();
  process.exit(0);
});

module.exports = connectWithRetry;
