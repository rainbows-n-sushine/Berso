const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
const {addReview,fetchAllReviewsForBusiness,deleteReview,editReview,getOneReview} = require('../controllers/review')

router.post('/add',addReview)
router.delete('/delete',deleteReview)
router.put('/edit',editReview)
router.get("/getOne",getOneReview)
<<<<<<< HEAD
router.post('/fetch-all-reviews-for-business/:businessId',fetchAllReviewsForBusiness)
=======
router.get('/fetch-all-reviews-for-business/:businessId',fetchAllReviewsForBusiness)
>>>>>>> 849ca815ab66433bf2f35135bd30586ad06fed3e

module.exports = router;
