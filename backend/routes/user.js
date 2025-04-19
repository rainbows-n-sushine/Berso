const express = require("express");
const router = express.Router();
const {
  validateUserSignup,
  userValidation,
} = require("../middleware/validation/user");
const { isAuth } = require("../middleware/auth");
<<<<<<< HEAD
const {signUp,signin,updateUserProfile,fetchUserData,updateUserProfilePic,fetchAll} = require('../controllers/user')
=======
const {signUp,signin,updateUserProfile,fetchUserData,updateUserProfilePic,fetchAll,favoriteBusiness,fetchUserSpecificFavorites,fetchMonthlyUsers} = require('../controllers/user')
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e

router.post('/signup',signUp)
router.post('/signin',signin)
router.post('/user-profile-data',fetchUserData)
router.post('/create-post',isAuth,(req,res)=>{

    res.send('Welcome to your secret route')
})

router.post("/update-profile", updateUserProfile);
router.post("/update-profilepic", updateUserProfilePic);
router.get('/fetch-all',fetchAll)
<<<<<<< HEAD
=======
router.post('/favorite-business',favoriteBusiness)
router.get('/fetch-user-specific-favorites/:userId',fetchUserSpecificFavorites)
router.get('/fetch-monthly-users',fetchMonthlyUsers)
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
module.exports = router;
