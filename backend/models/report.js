const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    
  },
  email: {
    type: String,
    
  },
  description: {
    type: String,
    
  },
<<<<<<< HEAD
=======
  date: {
    type: Date,
    default: Date.now(),
  },
  status:{
    type:String,
    default:"unread"
  },
  type:{
    type:String,
    default:"Technical Issue"
  }
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e

  
});

const Report = mongoose.model('Report', reportSchema);
module.exports = { Report };
