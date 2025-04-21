const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const validator=require('validator')
const bcrypt=require('bcryptjs')
const {getOneById}=require('./business')

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

exports.favoriteBusiness=async(req,res)=>{
  const {businessId,userId}=req.body
  try {
    console.log('this is the userId', userId)
    console.log('this is the businessId', businessId)
    const user=await User.findById(userId)

    if(user){
      console.log('this is the user',user)
     
      const oldFavorite=user.favorites

      console.log("this is old Fav", oldFavorite)
      const newFavorite=oldFavorite.concat(businessId)
      console.log('this is the newfav: ',newFavorite)
      try { 
        const updatedUser=await User.findOneAndUpdate({_id:userId},{favorites:newFavorite},{new:true})

        if (updatedUser){
          return res.json({message:"Business Added to collections!",success:true})
        }
        return res.json({message:"Failed to update the user in favoriting business found!",success:false})
      } catch (error) {
        
        if(error){
          console.log('error in favoriting a business')
        }
      }



    }
    
  } catch (error) {
    if(error){
      console.log('error in favouriting a business while looking for  a user')
    }
    
  }


}

exports.fetchUserSpecificFavorites = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (user) {
      const favorites = [];
      for (const businessId of user.favorites) {
        const business = await getOneById(businessId);
        if (business) {
          favorites.push(business);
        }
      }
      console.log('Fetched favorites:', favorites);
      if (favorites.length > 0) {
        return res.json({ success: true, message: "Favorites fetched successfully", favorites: favorites });
      } else {
        return res.json({ success: false, message: "No favorited businesses yet" });
      }
    } else {
      return res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.log('Error fetching favorites:', error.message);
    return res.status(500).json({ success: false, message: "Error fetching favorites" });
  }
};

exports.fetchMonthlyUsers = async (req, res) => {
  console.log('I\'m in fetchMonthlyUsers');
  
  try {
    const allUsers = await User.find();

    if (allUsers && allUsers.length > 0) {
      const totalMonthlyUsers = [];

      // Array of month names for easier labeling
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      // Loop through 12 months
      for (let i = 1; i <= 12; i++) {
        let monthlyUsersAmount = 0;

        // Loop through all users and count those who registered in the current month
        allUsers.forEach((user) => {
          if (user.date && user.date instanceof Date) {
            const newDate = new Date(user.date);
            const month = newDate.getMonth() + 1;  // JavaScript months are 0-indexed

            // Count users registered in the same month (adjusting for 0-based index)
            if (month === i) {
              monthlyUsersAmount++;
            }
          }
        });

        // Push data in the required format
        totalMonthlyUsers.push({
          label: monthNames[i - 1],  // Get the month name from the array
          y: monthlyUsersAmount
        });
      }

      // Send the response with data points
      res.json({
        message: "Successfully fetched all the users' data points",
        success: true,
        dataPoints: totalMonthlyUsers
      });
    } else {
      res.json({
        message: "No users found",
        success: false
      });
    }

  } catch (error) {
    console.log('Error fetching monthly users:', error);
    res.json({
      message: "Error fetching data",
      success: false
    });
  }
};

