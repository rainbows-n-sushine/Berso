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