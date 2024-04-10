const {User} = require("../models/user");
console.log('i am in teh users controller')

const signUp=async (req, res) => {
 console.log('imm her again')

    const {fullName,username,email,dateOfBirth,zipCode,password}=req.body;
    
    console.log(fullName + " "+username+" "+email+" "+dateOfBirth+" "+zipCode+" "+password);
      const isNewUser = await User.isUniqueCredentials(email,username);
      
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
        const user = await User({
            name: fullName,
            dob:dateOfBirth,
            zip_code:zipCode,
            email: email,
            password: password,
            username: username,
          });
          await user.save();
        return res.json(user);
       
      }
    }

 const signin=async(req,res)=>{
const {email,password}=req.body

const userExists = await User.userExists(email);

    if (userExists){


    }

}

module.exports={
    signin,
    signUp
}
