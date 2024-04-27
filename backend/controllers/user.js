const {User} = require("../models/user");
const jwt = require("jsonwebtoken");
const validator=require('validator')

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
      // password: password,
      username: username,
    });
    await user.save();
    return res.json({
      success: true,
      message: "The validation link has been sent to your email",
    });
  }
};

exports.signin = async (req, res) => {
  const { credential, password } = req.body;

  console.log("in in sign in controller");
const validEmail=validator.isEmail(credential)

  // const userExists = await User.userExists(email,password);
let user={}
  if(validEmail){
   user = await User.findOne({ email: credential});
  }
else{
   user = await User.findOne({ username: credential});
}
   
  console.log(user)

 

  if (user) { 
    
    const comparePassword = await user.comparePassword(password);
    if (comparePassword) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.json({ success: true, message: "user is signed in!", token:token });
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