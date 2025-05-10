const {ReviewImage} = require('../models/reviewImage')


exports.addImage=async(images,reviewId)=>{
    console.log(images)
   images.forEach((image)=>{


   })


    // try{
    //     const reviewImages= await ReviewImage({

    //      review:reviewId,
    //      data:images,
    //      name: String,
    //      contentType:String,

    //     })
    //    reviewImages.save()
    //    if(reviewImages){
    //     return res.json({success:true,message:"image successfully created"})
    //    }
        
    // }catch{
    //     (err)=>{if(err){console.log(err)}}
    // }
}

