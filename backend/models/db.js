<<<<<<< HEAD
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
        setTimeout(connectWithRetry, 10000); // Retry after 5 seconds
    });
};

// Start connection attempt
connectWithRetry();

// Handle connection errors
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected. Retrying...');
    connectWithRetry();
});

=======

require('dotenv').config()
var mongoose=require('mongoose')

mongoose.connect(process.env.MONGO_URI)
.then(()=>{

    console.log('database is connected')
})
.catch((err)=>{
    console.log(err.message)
})
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e

