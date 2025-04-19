const mongoose=require('mongoose');
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
    business_owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'BusinessOwner'


    },
    category:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"

    }],
    icon:{
        type:String,
        default:"faBuilding"


    },
    average_rating:{
        type: Number,
        default: 0,


    },
    rating_count: {
        type: Number,
        default: 0,
<<<<<<< HEAD


=======
    },
    
    latitude:{
        type:Number,
        default:0
    },

    longitude:{
        type:Number,
        default:0
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
    },
    review_count:{
        type: Number,
        default: 0,

    },
<<<<<<< HEAD
=======
    //checks if the newly registered business is verified by the admin or not. when it pons out on the admins panel notification
    status:{
        type:String,
        default:"unread"

    },
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e

    date:{
        type:Date,
        default:Date.now()
      },
<<<<<<< HEAD
=======
    
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e

})

const Business = mongoose.model("Business", businessSchema);
module.exports = { Business };
