const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',


  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',


  },
  rating: {
    type: Number,
    default: 0

  }
  
});

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = { Rating };
