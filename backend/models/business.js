const mongoose=require('mongoose');
const {User}=require('./user')
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
        type:String,


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


    }

})

const Business=mongoose.model('Business',businessSchema)
module.exports={Business}