const mongoose=require('mongoose');
const businessSchema=new mongoose.Schema({

    business_name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,

    },
    phone:{
        type:String,
        required:true,

    },
    category:{
        type:String,
        required:true,

    },
    website:{
        type:String,
        required:true,

    },
    location:{
        type:String,
        required:true,

    },
    address:{
        type:String,
        required:true,

    },
    business_days:{
        type:String,
        required:true,

    },
    opening_hours:{
        type:String,
        required:true,

    },
    average_price:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true,

    },

})

const Business=mongoose.model('Business',businessSchema)
module.exports={Business}