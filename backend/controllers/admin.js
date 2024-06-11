const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const validator=require('validator')
const bcrypt=require('bcrypt')


const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, "profile_" + Date.now() + path.extname(file.originalname));
    // cb(null, file.originalname);
  },
 
});


const upload = multer({ storage: storage }).single("profilePic");
 
exports.updateUserProfilePic = async (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      // Handle upload errors
      return res
        .status(500)
        .json({ success: false, message: "Error uploading profile picture" });
    }
  console.log("Request object:", req.file);

    const filePath = req.file.path; // Get the file path of the uploaded file

    // Read the uploaded file from the file system
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Error reading uploaded file" });
      }

      // Perform any other operation like saving to database
      // For example, if using Mongoose:
      const saveImage = new User({
        profilepic: {
          data: data,
          contentType: "image/jpg",
        },
      });
      saveImage.save();

      // Respond with success message
      return res.status(200).json({
        success: true,
        message: "Profile picture uploaded successfully",
        filePath,
      });
    });
  });
};

exports.signUp = async (req, res) => {
  const { username, email } = req.body.userData;
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
    const { fullName, username, email, dateOfBirth, zipCode, password } =
      req.body.userData;
    console.log("isNewUser.username  and  isNewUser.email");
    const user = await User({
      name: fullName,
      dob: dateOfBirth,
      zip_code: zipCode,
      email: email,
      password: password,
      username: username,
    });
    // await user.save();
    console.log("saved");
    try {
      await user.save();
      console.log("User saved successfully");
    } catch (error) {
      console.error("Error saving user:", error);
    }
    return res.json({
      success: true,
      message:
        "You have signed up, the validation link has been sent to your email",
    });
  }
};

exports.signin = async (req, res) => {
  const { credential, password } = req.body;

  console.log("in in sign in controller");
  console.log(credential + "   " + password);
  const validEmail = validator.isEmail(credential);

  // const userExists = await User.userExists(email,password);
let user={}
let userId=""
  if(validEmail){
   user = await User.findOne({ email: credential});
    }
else{
   user = await User.findOne({ username: credential});
 
}

  console.log(user);

  if (user) { 
    userId=user._id
    console.log('this is the user._id in the user controller :',user._id)
    const comparePassword = await user.comparePassword(password);
    
    if (comparePassword) {
      const userToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.json({ success: true, message: "user is signed in!", userToken:userToken,userId:userId });
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
  const { username, dateOfBirth, fullName, email, phone, zipCode, bio, currentPassword, newPassword,userId } = req.body;
  if(userId){
    let user= await User.findOne({_id:userId})
    const oldPassword=user.password
    console.log(oldPassword)
    const passwordMatches=await bcrypt.compare(currentPassword,oldPassword)
    console.log("the password matching is "+passwordMatches)
try {
    if(passwordMatches){
      const hashedPassword =await bcrypt.hash(newPassword,8) 
     user = await User.findOneAndUpdate({_id:userId},{ 
      
      name :fullName,
    username:username,
    phone :phone,
    zip_code:zipCode,
    bio:bio,
    email:email,
    dob: dateOfBirth,
    password: hashedPassword
  
  },{new:true})
    console.log(user);

    }
    
  
    if (user) {
      return res.json({ message: "User is updated", success: true });
    } else {
      return res.json({
        message: "User with that email doesn't exist",
        success: false,
      });
    }
  } catch (error) {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "An error occurred" });
    }
  }
  }else{
    return res.json({error:"user is not signed in"})
  }


  
};

// exports.userSignOut=async(req,res)=>{
//   jwt


// }

exports.fetchUserData=async(req,res)=>{
  const {userId}=req.body
  console.log('this is the userId inside the fetchUserData in controller '+userId )
  // const user_id=JSON.parse(userId)
  // console.log(user_id)
  const user=await User.findOne({_id:userId})
if(user){
  return res.json({success:true, message:"user data has successfully been fetched",user:user})
}else{
  return res.json({success:false, message:"user is not found"})
}

}

exports.fetchAll=async(req,res)=>{

   try {
    const users= await User.find()
    return res.json({success:true,message:"the users have been fetched",users:users})

    
   } catch (error) {
    if (error){

      console.log(error)
      return res.json({success:false,message:'error has occured'})
    }
    
   }


}