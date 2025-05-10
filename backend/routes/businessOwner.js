const express = require("express");
const router = express.Router();
const {signUp,signin,updateBusinessOwnerProfile,fetchBusinessOwnerData,updateBusinessOwnerProfilePic,fetchAll} = require('../controllers/businessOwner')

router.post('/signup',signUp)
router.post('/signin',signin)
router.post('/business-owner-profile-data',fetchBusinessOwnerData)
router.post("/update-profile", updateBusinessOwnerProfile);
router.post("/update-profilepic", updateBusinessOwnerProfilePic);
router.get('/fetch-all',fetchAll)
module.exports = router;
