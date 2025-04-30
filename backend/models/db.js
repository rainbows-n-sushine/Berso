require('dotenv').config();
const mongoose = require('mongoose');

let isConnecting = false;

const connectWithRetry = () => {
    if (isConnecting) return;

    console.log(`[${new Date().toISOString()}] Attempting to connect to MongoDB...`);
    isConnecting = true;

    mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 30000,  
        socketTimeoutMS: 45000,         
    })
    .then(() => {
        console.log(`[${new Date().toISOString()}] Database is connected`);
        isConnecting = false;
    })
    .catch((err) => {
        console.error(`[${new Date().toISOString()}] Connection failed. Retrying in 10s...`, err.message);
        isConnecting = false;
        setTimeout(connectWithRetry, 10000);
    });
};

mongoose.connection.on('disconnected', () => {
    console.log(`[${new Date().toISOString()}] MongoDB disconnected. Retrying...`);
    connectWithRetry();
});

mongoose.connection.on('error', (err) => {
    console.error(`[${new Date().toISOString()}] MongoDB error:`, err);
});

module.exports = connectWithRetry;
