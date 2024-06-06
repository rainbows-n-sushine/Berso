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

  
});

const Report = mongoose.model('Report', reportSchema);
module.exports = { Report };
