const { BusinessOwner } = require("../models/businessOwner");
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
 
exports.updateBusinessOwnerProfilePic = async (req, res) => {
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
      const saveImage = new BusinessOwner({
        profilepic: {
          data: data,
          contentType: "image/jpg",
        },
      });
      saveImage.save();

      // Respond with success message
      return res.status(200).json({
        success: true,
        message: "Profile picture of business owner uploaded successfully",
        filePath,
      });
    });
  });
};

exports.signUp = async (req, res) => {
  const { username, email } = req.body.userData;
  // fullName,username,email,dateOfBirth,zipCode,password,confirmPassword

  console.log(req.body);

  const isNewbusinessOwner = await BusinessOwner.isUniqueCredentials(email, username);

  if (!isNewbusinessOwner.email && !isNewbusinessOwner.username) {
    console.log("both not isNewbusinessOwner.username  and  isNewbusinessOwner.email ");
    return res.json({
      success: false,
      message: "This email and username is already in use, try sign-in",
    });
  } else if (!isNewbusinessOwner.email) {
    console.log("not  isNewbusinessOwner.email ");
    return res.json({
      success: false,
      message: "This email is already in use, try sign-in",
    });
  } else if (!isNewbusinessOwner.username) {
    console.log("not isNewbusinessOwner.username");
    return res.json({
      success: false,
      message: "This email is already in use, try sign-in",
    });
  } else {
    const { fullName, username, email, dateOfBirth, zipCode, password } =
      req.body.userData;
    console.log("isNewbusinessOwner.username  and  isNewbusinessOwner.email");
    const businessOwner = await BusinessOwner({
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
      await businessOwner.save();
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

  console.log("in in businessOwner sign in controller");
  console.log(credential + "   " + password);
  const validEmail = validator.isEmail(credential);

  // const businessOwnerExists = await BusinessOwner.businessOwnerExists(email,password);
let businessOwner={}
  if(validEmail){
    businessOwner = await BusinessOwner.findOne({ email: credential});
    }
else{
  businessOwner = await BusinessOwner.findOne({ username: credential});
 
}

  console.log(businessOwner);

  if (businessOwner) { 
   let businessOwnerId=businessOwner._id
    console.log('this is the businesss ownerId',businessOwner._id)
    const comparePassword = await businessOwner.comparePassword(password);
    
    if (comparePassword) {
      const businessOwnerToken = jwt.sign({ businessOwnerId: businessOwner._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      return res.json({ success: true, message: "businessOwner is signed in!", businessOwnerToken:businessOwnerToken,businessOwnerId:businessOwnerId });
    } else {
      return res.json({
        success: false,
        message: "incorrect password,try again!",
      });
    }
  } else {
    return res.json({
      success: false,
      message: "businessOwner with that email is not found, try sign up",
    });
  }
};



exports.updateBusinessOwnerProfile = async (req, res) => {
  const { username, dateOfBirth, fullName, email, phone, zipCode, bio, currentPassword, newPassword,businessOwnerId } = req.body;
  if(businessOwnerId){
    let businessOwner= await BusinessOwner.findOne({_id:businessOwnerId})
    const oldPassword=businessOwner.password
    console.log(oldPassword)
    const passwordMatches=await bcrypt.compare(currentPassword,oldPassword)
    console.log("the password matching is "+passwordMatches)
try {
    if(passwordMatches){
      const hashedPassword =await bcrypt.hash(newPassword,8) 
     businessOwner = await BusinessOwner.findOneAndUpdate({_id:businessOwnerId},{ 
      
      name :fullName,
    username:username,
    phone :phone,
    zip_code:zipCode,
    bio:bio,
    email:email,
    dob: dateOfBirth,
    password: hashedPassword
  
  },{new:true})
    console.log(businessOwner);

    }
    
  
    if (businessOwner) {
      return res.json({ message: "business owner is updated", success: true });
    } else {
      return res.json({
        message: "business owner with that email doesn't exist",
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
    return res.json({error:"business owner is not signed in"})
  }


  
};

// exports.userSignOut=async(req,res)=>{
//   jwt


// }

exports.fetchBusinessOwnerData=async(req,res)=>{
  const {businessOwnerId}=req.body
  console.log('this is the businessOwnerId inside the fetchBusinessOwnerData in controller '+businessOwnerId )
  // const user_id=JSON.parse(userId)
  // console.log(user_id)
  const businessOwner=await BusinessOwner.findOne({_id:businessOwnerId})
if(businessOwner){
  return res.json({success:true, message:"businessOwner data has successfully been fetched",businessOwner:businessOwner})
}else{
  return res.json({success:false, message:"businessOwner is not found"})
}

}

exports.fetchAll=async(req,res)=>{

   try {
    const businessOwners= await BusinessOwner.find()
    return res.json({success:true,message:"the users have been fetched",businessOwners:businessOwners})

    
   } catch (error) {
    if (error){

      console.log(error)
      return res.json({success:false,message:'error has occured'})
    }
    
   }


}