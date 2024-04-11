
const express=require('express')
const {signUp,signin} = require('../controllers/user')
const router=express.Router();
const {validateUserSignup,userValidation}=require('../middleware/validation/user')

router.post('/signup',signUp)
router.post('/signin',signin)


module.exports=router;


