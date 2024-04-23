const {User} = require("../models/user");
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

  

  const {username,dateOfBirth,fullName,email,phone,zipCode,bio,currentPassword, newPassword}=req.body

 
  
    

  
  try {
    const user= await User.findOne({email:email})
    console.log(user)
    if(user){
    
      user.name=fullName
      // user.username=username
      // user.email=email
      user.phone=phone
      user.zip_code=zipCode
      user.bio=bio
      user.dob=dateOfBirth
      // user.password=newPassword

   
      await user.save()
      console.log(user)
      return res.json({message:"user is updated"})
  }else{
    return res.json({message:"user with that email doesnt exist"})
  }
    
  } catch (error) {
       if(error){
    console.log(error);
    return res.status(500).json({ message: "An error occurred" });
  }
    
   
  }
  
    
 
    

  
}
