require('dotenv').config();
const mongoose = require('mongoose');

const connectWithRetry = () => {
    console.log('Attempting to connect to MongoDB...');
    
    mongoose.connect(process.env.MONGO_URI, {

        serverSelectionTimeoutMS: 300000, // Wait 5 seconds before failing
        socketTimeoutMS: 600000, // Keep trying for 45s
    })
    .then(() => {
        console.log('Database is connected');
    })
    .catch((err) => {
        console.error('Database connection failed. Retrying in 10 seconds...', err);
        setTimeout(connectWithRetry, 10000);
    });
};



mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected. Retrying...');
    connectWithRetry();
});

module.exports={connectWithRetry}


