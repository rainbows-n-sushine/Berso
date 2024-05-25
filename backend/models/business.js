const mongoose=require('mongoose');
const User=require('./user')
const businessSchema=new mongoose.Schema({

    business_name:{
        type:String,
        

    },
    email:{
        type:String,
        

    },
    phone:{
        type:String,
        

    },
    category:{
        type:Object,


    },
    website:{
        type:String,
       

    },
    location:{
        type:String,
        

    },
    address:{
        type:String,
        

    },
    business_days:{
        type:String,
       

    },
    opening_hours:{
        type:String,
        

    },
    average_price:{
        type:String,
    

    },
    description:{
        type:String,
        

    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'


    },
    icon:{
        type:String,
        default:"faBuilding"


    },
    average_rating:{
        type: Number,
        default: 0,


    },
    review_count: {
        type: Number,
        default: 0,


    },

})

const Business=mongoose.model('Business',businessSchema)
module.exports={Business}