const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
const {addReview,fetchAllReviewsForBusiness,deleteReview,editReview,getOneReview} = require('../controllers/review')

router.post('/add',addReview)
router.delete('/delete',deleteReview)
router.put('/edit',editReview)
router.get("/getOne",getOneReview)
router.get('/fetch-all-reviews-for-business/:businessId',fetchAllReviewsForBusiness)

module.exports = router;
