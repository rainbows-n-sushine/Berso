const {User} = require("../models/user");

exports.signUp=async (req, res) => {
 

    const {fullName,username,email,dateOfBirth,zipCode,password}=req.body;
    
    console.log(fullName + " "+username+" "+email+" "+dateOfBirth+" "+zipCode+" "+password);
      const isNewUser = await User.isUniqueCredentials(email,username);
      const user = await User({
        name: fullName,
        dob:dateOfBirth,
        zip_code:zipCode,
        email: email,
        password: password,
        username: username,
      });
      await user.save();
    console.log()
      if (!isNewUser.email && !isNewUser.username) {
        return res.json({
          success: false,
          message: "This email and username is already in use, try sign-in",
        });
      } 
      else if (!isNewUser.email)
      {
        return res.json({
          success: false,
          message: "This email is already in use, try sign-in",
        });
        
      }
      else if (!isNewUser.username)
      {
        return res.json({
          success: false,
          message: "This email is already in use, try sign-in",
        });
        
      }
      else {
        return res.json(user);
       
      }
    }


    exports.signin=async(req,res)=>{
const {email,password}=req.body








    }