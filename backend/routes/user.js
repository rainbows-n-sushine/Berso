
const express=require('express')
const {signUp,signin,updateUserProfile,fetchUserData} = require('../controllers/user')
const router=express.Router();
const {validateUserSignup,userValidation}=require('../middleware/validation/user')
const{isAuth}=require('../middleware/auth')

router.post('/signup',signUp)
router.post('/signin',signin)
router.post('/user-profile-data',fetchUserData)
router.post('/create-post',isAuth,(req,res)=>{

    res.send('Welcome to your secret route')
})

router.post('/update-profile',updateUserProfile)

module.exports=router;


