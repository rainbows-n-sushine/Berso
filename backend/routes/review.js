const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review");
const { isAuth } = require("../middleware/auth");

router.post("/", isAuth, reviewController.createReview);
router.get("/business/:businessId", reviewController.getReviewsByBusiness);

module.exports = router;