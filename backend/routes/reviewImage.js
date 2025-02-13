const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review");
const { isAuth } = require("../middleware/auth");

// router.post("/", isAuth, reviewController.createReview);
// router.get("/business/:businessId", reviewController.getReviewsByBusiness);


// const {addImages} = require('../controllers/reviewImage')

// router.post('/add',addImages)


// module.exports = router;
