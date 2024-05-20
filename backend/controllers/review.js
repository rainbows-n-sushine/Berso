const { Review } = require("../models/review")

exports.addReview=async(req,res)=>{
    const {title,description,userId,businessId}=req.body

    try{
        const newReview= await Review({

           title:title,
           description:description,
           userId:userId,
           businessId:businessId

        })
        newReview.save()
        return res.json({success:true,message:"review successfully submitted"})
    }catch{
        (err)=>{if(err){console.log(err)}}
    }
}

exports.fetchAllReviewsForBusiness=async(req,res)=>{
    const {businessId}=req.body

   const reviews= await Review.find()
   try {
     res.json({success:true, message:"reviews are fetched", reviews:reviews})

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