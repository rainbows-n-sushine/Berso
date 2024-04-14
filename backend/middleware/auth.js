const jwt=require('jsonwebtoken');

const {User}=require('../models/user');

exports.isAuth=async(req,res,next)=>{

    console.log("in authn module")
    
    if(req.headers && req.headers.authorization){
        console.log(req.headers.authorization)
        const token=req.headers.authorization.split(" ")[1]


        try {
            const decode=jwt.verify(token,process.env.JWT_SECRET)
            const user=await User.findById(decode.userId)
            if(!user){
                res.json({success:false,message:"unauthorized access, wrong user"})
            }
            req.user=user
            await console.log('Authorized to post')
            next();
        } catch (error) {
            if(error.name==="JsonWebTokenError"){
                return res.json({success:false,message:"unauthorized access, false token"})

            }
            if(error.name==="TokenExpiredError"){
                return res.json({success:false,message:"Session expired, try sign in!"})

            }
            res.json('Internal server error!')
            
        }
       
    }else{
        res.json({success:false,message:"unauthorized access"})

}


}