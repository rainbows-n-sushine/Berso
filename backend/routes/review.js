const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const reviewController = require("../controllers/review");
const { isAuth } = require("../middleware/auth");

router.post("/", isAuth, reviewController.createReview);
router.get("/business/:businessId", reviewController.getReviewsByBusiness);

module.exports = router;
=======
const {addReview,fetchAllReviewsForBusiness,deleteReview,editReview,getOneReview} = require('../controllers/review')

router.post('/add',addReview)
router.delete('/delete',deleteReview)
router.put('/edit',editReview)
router.get("/getOne",getOneReview)
router.post('/fetchAllReviewsForBusiness',fetchAllReviewsForBusiness)

module.exports = router;
>>>>>>> hbranch
