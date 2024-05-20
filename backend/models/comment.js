const mongoose=require('mongoose');
const commentSchema=new mongoose.Schema({

    text:{
      type:String,

    },

    comment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"

    },


    business:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Business'

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    review:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }

})

const Comment=mongoose.model('Comment',commentSchema)
module.exports={Comment}