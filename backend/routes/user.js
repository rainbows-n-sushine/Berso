
const express=require('express')
const {signUp } = require('../controllers/user')
const router=express.Router()

router.use('/signup/create-user',signUp)


module.exports=router;


