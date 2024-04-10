const {User} = require("../models/user");

exports.signUp=async(req, res) => {

    const {fullName,username,email,dateOfBirth,zipCode,password}=req.body;

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
        return res.json("Click the link sent to your email");
       
      }
    }

 exports.signin=async(req,res)=>{
const {email,password}=req.body

const userExists = await User.userExists(email);

    if (userExists){


    }

}


