const {User} = require("../models/user");

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
          message: "This email is already in use, try sign-in",
        });
        
      }
      else {
        const {fullName,username,email,dateOfBirth,zipCode,password}=req.body;
        console.log('isNewUser.username  and  isNewUser.email ')
        const user = await User({
            name: fullName,
            dob:dateOfBirth,
            zip_code:zipCode,
            email: email,
            password: password,
            username: username,
          });
        await user.save();
        return res.json({success:true,message:"To validate sign up, Click the link sent at your email"});
       
      }
    }

 exports.signin=async(req,res)=>{
const {email,password}=req.body

console.log('in in sign in controller')

// const userExists = await User.userExists(email,password);

const user=await User.findOne({email:email})

const comparePassword= await user.comparePassword(password)

   if (user){
  
    if(comparePassword){
      return res.json ({success:true,message:"user is signed in!"})
    }
    else{
      return res.json ({success:false,message:"incorrect password,try again!"})
    }
    
   }
   else{
    return res.json ({success:false,message:"user with that email is not found, try sign up"})
   }

}


