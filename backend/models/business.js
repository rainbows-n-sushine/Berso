const mongoose=require('mongoose');
const fs =require('fs')
const path=require('path')

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
    },
    
    latitude:{
        type:Number,
        default:0
    },

    longitude:{
        type:Number,
        default:0
    },
    review_count:{
        type: Number,
        default: 0,

    },
    //checks if the newly registered business is verified by the admin or not. when it pons out on the admins panel notification
    status:{
        type:String,
        default:"unread"

    },

    date:{
        type:Date,
        default:Date.now()
      },
     picture: {
        data: Buffer,
        contentType: String
      }
    

})

businessSchema.pre("save", function (next) {
    if (!this.picture || !this.picture.data) {
      const defaultImagePath = path.join(__dirname, "../images/businesses/logo.png");
  
      this.picture = {
        data: fs.readFileSync(defaultImagePath),
        contentType: "image/png",
      };
    }
    next();
  });

const Business = mongoose.model("Business", businessSchema);
module.exports = { Business };


