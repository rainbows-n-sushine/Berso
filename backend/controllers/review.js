const {Review} = require('../models/review')
const {addImage}=require('./reviewImage')

exports.addReview=async(req,res)=>{
    const {review,userId,businessId,images}=req.body
    const {title,description}=review
 
    console.log("  this is the review  ",
        review,"  this is the userId ",
        userId,"  this is businessId  ",
        businessId


    )

    try{
        const review= await Review({

           title:title,
           description:description,
           user:userId,
           business:businessId,

        })
        review.save()
        const reviewId=review._id
        console.log('this is the new review added ,',review)

        if(images.length!==0){

            addImage(images,reviewId)
        }
        

        

        return res.json({success:true,message:"review successfully submitted"})
    }catch{
        (err)=>{if(err){console.log(err)}}
    }
}

exports.fetchAllReviewsForBusiness=async(req,res)=>{
    const {businessId}=req.params

   const reviews= await Review.find().maxTime(30000)
   try {
    if(reviews){

        res.json({success:true, message:"reviews are fetched", reviews:reviews}) 
    }
    

   } catch (error) {
    if(error){console.log("the error in fetchAllReviewsForBusiness is : ",error)}
   }
}

//deleteReview,editReview,getOneReview

exports.deleteReview=async(req,res)=>{

    const {reviewId}=req.params

    
    try{
        const review=await Review.findOneAndDelete({_id:reviewId})

        if (review){
            return res.json({message:'review deleted successfully', success:true})
        }
        else{
            return res.json({message:'Error in deleting review', success:false})
        }


    }catch{(error)=>{

        if(error){

            console.log("error in deleting reveiw backend :",error.message)
        }
    } }

}

exports.editReview=async(req,res)=>{

    const {title,description,reviewId}=req.body

 

 try {
    
    const review=await Review.findOneAndUpdate({_id:reviewId})
if(review){
    return res.json({message:"review is updated successfully",success:true})
}else{
    return res.json({message:"review is not updated successfully",success:false})
}

 
 } catch (error) {
    if (error){
        console.log('error in edit Review ',error.message)
    }
    
 }}

 exports.getOneReview=async(req,res)=>{
    const {reviewId}=req.body
    try {
        const review= await Review.findOne({_id:reviewId})

        if(review){
return res.json({message:"here is the detail of the review ", success:true, review:review })

        }
        else{
            return res.json({message:"trouble fetching the detail of this review, try refreshing ", success:false })

        }
        
    } catch (error) {
        if (error){
            console.log('error in getOne Review ',error.message)
        }
        
        
    }


 }
