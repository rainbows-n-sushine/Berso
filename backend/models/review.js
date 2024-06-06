const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title:{
    type:String,
    

},
description:{
    type:String,

},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',


  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',


  },
  // rating: {
  //   type: Number,
  //   required: true,


  // },
  // comment: {
  //   type: String,


  // },
  created_at: {
    type: Date,
    default: Date.now,

    
  },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = { Review };
