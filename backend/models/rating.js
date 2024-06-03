const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,


  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business',
    required: true,


  },
  rating: {
    type: Number,
    required: true,
  }
  
});

const Rating = mongoose.model('Rating', ratingSchema);
module.exports = { Rating };
