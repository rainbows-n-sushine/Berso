const express = require("express");
const router = express.Router();
const {
  validateUserSignup,
  userValidation,
} = require("../middleware/validation/user");
const { isAuth } = require("../middleware/auth");
const {signUp,signin,updateUserProfile,fetchUserData,updateUserProfilePic,fetchAll,favoriteBusiness,fetchUserSpecificFavorites,fetchMonthlyUsers} = require('../controllers/user')

router.post('/signup',signUp)
router.post('/signin',signin)
router.post('/user-profile-data',fetchUserData)
router.post('/create-post',isAuth,(req,res)=>{

    res.send('Welcome to your secret route')
})

router.post("/update-profile", updateUserProfile);
router.post("/update-profilepic", updateUserProfilePic);
router.get('/fetch-all',fetchAll)
router.post('/favorite-business',favoriteBusiness)
router.get('/fetch-user-specific-favorites/:userId',fetchUserSpecificFavorites)
router.get('/fetch-monthly-users',fetchMonthlyUsers)
module.exports = router;
