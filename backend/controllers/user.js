const {User} = require("../models/user");
const jwt = require("jsonwebtoken");
const validator=require('validator')
const bcrypt=require('bcrypt')


exports.signUp = async (req, res) => {
  const { username, email } = req.body;
  // fullName,username,email,dateOfBirth,zipCode,password,confirmPassword

  console.log(req.body);

  const isNewUser = await User.isUniqueCredentials(email, username);

  if (!isNewUser.email && !isNewUser.username) {
    console.log("both not isNewUser.username  and  isNewUser.email ");
    return res.json({
      success: false,
      message: "This email and username is already in use, try sign-in",
    });
  } else if (!isNewUser.email) {
    console.log("not  isNewUser.email ");
    return res.json({
      success: false,
      message: "This email is already in use, try sign-in",
    });
  } else if (!isNewUser.username) {
    console.log("not isNewUser.username");
    return res.json({
      success: false,
      message: "This email is already in use, try sign-in",
    });
  } else {
    const { fullName, username, email, dateOfBirth, zipCode, password } =req.body;
    console.log("isNewUser.username  and  isNewUser.email");
    const user = await User({
      name: fullName,
      dob: dateOfBirth,
      zip_code: zipCode,
      email: email,
      password: password,
      username: username,
    });
    await user.save();
    return res.json({
      success: true,
      message: "You have signed up, the validation link has been sent to your email",
    });
  }
};

exports.signin = async (req, res) => {
  const { credential, password } = req.body;

  console.log("in in sign in controller");
  console.log(credential+ "   "+password )
const validEmail=validator.isEmail(credential)

  // const userExists = await User.userExists(email,password);
let user={}
let userId=""
  if(validEmail){
   user = await User.findOne({ email: credential});
   userId=JSON.stringify(user._id)
  console.log(JSON.stringify(user._id))
   
    }
else{
   user = await User.findOne({ username: credential});
   userId=JSON.stringify(user._id)
   console.log(JSON.stringify(user._id))
 
}

 

  if (user) { 
    
    const comparePassword = await user.comparePassword(password);
    
    if (comparePassword) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.json({ success: true, message: "user is signed in!", token:token,userId:userId });
    } else {
      return res.json({
        success: false,
        message: "incorrect password,try again!",
      });
    }
  } else {
    return res.json({
      success: false,
      message: "user with that email is not found, try sign up",
    });
  }
};


exports.updateUserProfile = async (req, res) => {
  const { username, dateOfBirth, fullName, email, phone, zipCode, bio, currentPassword, newPassword } = req.body;

 bcrypt.comparePassword()

  try {
    const user = await User.findOneAndUpdate({email:email},{ 
      
      name :fullName,
    username:username,
    phone :phone,
    zip_code:zipCode,
    bio:bio,
    dob: dateOfBirth,
    password: newPassword},{new:true})
    console.log(user);
    await user.save();
    if (user) {
     
      return res.json({ message: "User is updated", success: true });
    } else {
      return res.json({ message: "User with that email doesn't exist", success: false });
    }
  } catch (error) {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "An error occurred" });
    }
  }
};

// exports.userSignOut=async(req,res)=>{
//   jwt


// }