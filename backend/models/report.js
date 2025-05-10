const mongoose = require('mongoose');

const reportTypes = [
  "Technical Issue",
  "Inappropriate Action",
  "Feature Request",
  "Business Issue",
];

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
    enum: reportTypes,
    default:"Technical Issue"
  }

  
});

const Report = mongoose.model('Report', reportSchema);
module.exports = { Report };
