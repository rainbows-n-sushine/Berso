const { Comment } = require("../models/comment")

exports.addComment=async(req,res)=>{
    const {text,commentId,businessId,userId,reviewId}=req.body

    try{
        const newComment= await Comment({

            text:text,
            comment:commentId,
            business:businessId,
            user:userId,
            review:reviewId

        })
        newComment.save()
        return res.json({success:true,message:"Comment successfully submitted"})
    }catch{
        (err)=>{if(err){console.log(err)}}
    }
}

exports.fetchAllCommentsForBusiness=async(req,res)=>{
    const {businessId}=req.body

  
   try {
     const comments= await Comment.find()
     if(comments){
    res.json({success:true, message:"Comments are fetched", comments:comments})
        
     }else{
        res.json({success:false, message:"Cannot find comments"})
     }
    } catch (error) {
    if(error){console.log("the error in fetchAllCommentsForBusiness is : ",error)}
   }
}


exports.deleteComment=async(req,res)=>{

    const {commentId}=req.params

    
    try{
        const comment=await Comment.findOneAndDelete({_id:commentId})

        if (comment){
            return res.json({message:'Comment deleted successfully', success:true})
        }
        else{
            return res.json({message:'Error in deleting Comment', success:false})
        }


    }catch{(error)=>{

        if(error){

            console.log("error in deleting comment backend :",error.message)
        }
    } }

}

exports.editComment=async(req,res)=>{

    const {title,description,commentId}=req.body

 

 try {
    
    const comment=await Comment.findOneAndUpdate({_id:commentId})
if(comment){
    return res.json({message:"Comment is updated successfully",success:true})
}else{
    return res.json({message:"Comment is not updated successfully",success:false})
}

 
 } catch (error) {
    if (error){
        console.log('error in edit Comment ',error.message)
    }
    
 }}

 exports.getOneComment=async(req,res)=>{
    const {commentId}=req.body
    try {
        const comment= await Comment.findById(commentId)

        if(comment){
          return res.json({message:"here is the detail of the Comment ", success:true, comment:comment })

        }
        else{
            return res.json({message:"trouble fetching the detail of this Comment, try refreshing ", success:false })

        }
        
    } catch (error) {
        if (error){
            console.log('error in getOne Comment ',error.message)
        }
        
        
    }


 }