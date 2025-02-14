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
<<<<<<< HEAD
  created_at: {
    type: Date,
    default: Date.now,
=======
  date: {
    type: Date,
    default: Date.now(),
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e

    
  },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = { Review };
