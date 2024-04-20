
const express=require('express')
const {registerBusiness} = require('../controllers/business')
const router=express.Router();
// const {validateUserSignup,userValidation}=require('../middleware/validation/user')
const{isAuth}=require('../middleware/auth')

router.post('/register-business',registerBusiness)
// router.post('/signin',signin)
// router.post('/create-post',isAuth,(req,res)=>{

//     res.send('Welcome to your secret route')
// })

// router.put('/updateProfile',updateUserProfile)

module.exports=router;