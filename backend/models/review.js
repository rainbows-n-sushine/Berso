<<<<<<< HEAD
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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


  },
  comment: {
    type: String,


  },
  created_at: {
    type: Date,
    default: Date.now,

    
  },
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = { Review };
=======
const mongoose=require('mongoose');
const reviewSchema=new mongoose.Schema({

    title:{
        type:String,
        

    },
    description:{
        type:String,

    },
    business:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Business'

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

})

const Review=mongoose.model('Category',reviewSchema)
module.exports={Review}
>>>>>>> hbranch
