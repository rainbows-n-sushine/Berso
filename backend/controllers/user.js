const { User } = require("../models/user");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  const { username, email } = req.body;

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
    const { fullName, username, email, dateOfBirth, zipCode, password } =
      req.body;
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
      message: "The validation link has been sent to your email",
    });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  console.log("in in sign in controller");

  // const userExists = await User.userExists(email,password);

  const user = await User.findOne({ email: email });

  const comparePassword = await user.comparePassword(password);

  if (user) {
    if (comparePassword) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.json({ success: true, message: "user is signed in!", token });
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


exports.updateUserProfile=async(req,res)=>{

  

  const {username,firstName,middleName,lastName,email,phoneNumber,zipCode,bio,currentPassword, newPassword}=req.body

  // const user= await User.findOne({email:email})

  User.update({

  },{where:{email:email}})
  .then((res)=>{
    res.json({message :"successfully uodates",success:true,profile:user})
  })
  .catch((error)=>{
if(error){
  console.log(error.message())
}
  })


  

}
