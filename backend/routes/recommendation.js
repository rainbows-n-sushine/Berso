const express = require("express");
const router = express.Router();
const recommendationController = require("../controllers/recommendation");
const { isAuth } = require("../middleware/auth");

router.get("/recommendations", isAuth, recommendationController.getRecommendations);
router.get("/personalized", isAuth, recommendationController.getPersonalizedRecommendations);
router.get("/:businessId/filtered", recommendationController.filterReviews);

module.exports = router;