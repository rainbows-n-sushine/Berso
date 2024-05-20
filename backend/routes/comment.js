const express = require("express");
const router = express.Router();
const {addReview,fetchAllReviewsForBusiness,deleteReview,editReview,getOneReview} = require('../controllers/comment')

router.post('/add',addComment)
router.delete('/delete',deleteReview)
router.put('/edit',editReview)
router.get("/getOne",getOneReview)
router.post('/fetchAllReviewsForBusiness',fetchAllReviewsForBusiness)

module.exports = router;
