const express = require("express");
const router = express.Router();
const {
  validateUserSignup,
  userValidation,
} = require("../middleware/validation/user");
const { isAuth } = require("../middleware/auth");
const {signin,signUp} = require('../controllers/admin')

router.post('/signUp',signUp)
router.post('/signin',signin)
// router.post('/user-profile-data',fetchUserData)
// router.post('/create-post',isAuth,(req,res)=>{

//     res.send('Welcome to your secret route')
// })

// router.post("/update-profile", updateUserProfile);
// router.post("/update-profilepic", updateUserProfilePic);
// router.get('/fetch-all',fetchAll)
module.exports = router;
