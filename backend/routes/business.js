const express = require("express");
<<<<<<< HEAD
const { registerBusiness, fetchAll,fetchOne,deleteBusiness,updateOne,fetchByCategory,getByBusinessOwner,getBusinessInfo,getCategories} = require("../controllers/business");
=======
const { registerBusiness, fetchAll,fetchOne,deleteBusiness,updateOne,fetchByCategory,getByBusinessOwner,getBusinessInfo,getCategories,fetchNewBuinesses} = require("../controllers/business");
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
const router = express.Router();
// const {validateUserSignup,userValidation}=require('../middleware/validation/user')
const { isAuth } = require("../middleware/auth");
router.post("/register-business", registerBusiness);
router.get("/fetch-by-category/:categoryId", fetchByCategory);
router.get('/get-by-business-owner/:businessOwnerId',getByBusinessOwner)
router.get('/fetch-all',fetchAll)
router.get('/get-one/:businessId',fetchOne)
router.delete('/delete/:businessId',deleteBusiness)
router.put('/update-one', updateOne)
router.post('/get-categories',getCategories)
<<<<<<< HEAD
=======
router.get('/fetch-new-businesses',fetchNewBuinesses)
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e
// router.post("/get-business-info",getBusinessInfo)

// router.post('/signin',signin)
// router.post('/create-post',isAuth,(req,res)=>{

//     res.send('Welcome to your secret route')
// })

// router.put('/updateProfile',updateUserProfile)

module.exports = router;
