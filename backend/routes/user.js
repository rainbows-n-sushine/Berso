const express = require("express");
const router = express.Router();
const {
  validateUserSignup,
  userValidation,
} = require("../middleware/validation/user");
const { isAuth } = require("../middleware/auth");
const {signUp,signin,updateUserProfile,fetchUserData,updateUserProfilePic,fetchAll} = require('../controllers/user')

router.post('/signup',signUp)
router.post('/signin',signin)
router.post('/user-profile-data',fetchUserData)
router.post('/create-post',isAuth,(req,res)=>{

    res.send('Welcome to your secret route')
})

router.post("/update-profile", updateUserProfile);
router.post("/update-profilepic", updateUserProfilePic);
router.get('/fetch-all',fetchAll)
module.exports = router;
