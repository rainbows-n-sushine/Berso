const {User} = require("../models/user");
const jwt=require('jsonwebtoken');

exports.signUp=async(req, res) => {

    const {username,email}=req.body;

    console.log(req.body);
    
    
    const isNewUser = await User.isUniqueCredentials(email,username);
    
  
    
    
      if (!isNewUser.email && !isNewUser.username) {
        console.log('both not isNewUser.username  and  isNewUser.email ')
        return res.json({
          success: false,
          message: "This email and username is already in use, try sign-in",
        });
      } 
      else if (!isNewUser.email)
      {
        console.log('not  isNewUser.email ')
        return res.json({
          success: false,
          message: "This email is already in use, try sign-in",
        });
        
      }
      else if (!isNewUser.username)
      {
        console.log('not isNewUser.username')
        return res.json({
          success: false,
          message: "This usernamezx is already in use, try sign-in",
        });
        
      }
      else {
        const {fullName,username,email,dateOfBirth,zipCode,password}=req.body;
        console.log('isNewUser.username  and  isNewUser.email')
        const user = await User({
            name: fullName,
            dob:dateOfBirth,
            zip_code:zipCode,
            email: email,
            password: password,
            username: username,
          });
        await user.save();
        return res.json({success:true,message:"The validation link has been sent to your email"});
       
      }
    }

 exports.signin=async(req,res)=>{
const {credential,password}=req.body


  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ;
  const isEmail= emailPattern.test(credential);
  var user="";
  console.log(isEmail)
  console.log(credential)
if(credential){

  if(isEmail){
    user=await User.findOne({email:credential})


}else{
user=await User.findOne({username:credential})
}

}else{

  res.json({success:false, message:"Enter a userna-me or password"})
}


  console.log('in in sign in controller')

console.log(user)

// const user=await User.findOne({email:email})



   if (user){
    const comparePassword= await user.comparePassword(password)
  
    if(comparePassword){
      const token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})



      return res.json ({success:true,message:"user is signed in!",token})
    }
    else{
      return res.json ({success:false,message:"incorrect password,try again!"})
    }
    
   }
   else{
    if(isEmail){
      return res.json ({success:false,message:"user with that email is not found, try sign up"})

    }else{
      return res.json ({success:false,message:"user with that username is not found, try sign up"})
    }

   }

}


