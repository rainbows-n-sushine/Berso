
const express=require('express')
const {signUp,signin,updateUserProfile} = require('../controllers/user')
const router=express.Router();
const {validateUserSignup,userValidation}=require('../middleware/validation/user')
const{isAuth}=require('../middleware/auth')

router.post('/signup',validateUserSignup,userValidation,signUp)
router.post('/signin',signin)
router.post('/create-post',isAuth,(req,res)=>{

    res.send('Welcome to your secret route')
})

router.put('/update-profile',updateUserProfile)

module.exports=router;


