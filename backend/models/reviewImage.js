const mongoose = require('mongoose');

const reviewImagesSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
  contentType:String,
  review: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Review"
  }

});

const ReviewImage = mongoose.model('ReviewImage', reviewImagesSchema);

module.exports = ReviewImage;