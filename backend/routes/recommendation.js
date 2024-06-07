const express = require("express");
const router = express.Router();
const recommendationController = require("../controllers/recommendation");
const { isAuth } = require("../middleware/auth");

// Existing routes
router.get("/recommendations", isAuth, recommendationController.getRecommendations);
router.get("/personalized", isAuth, recommendationController.getPersonalizedRecommendations);
router.get("/:businessId/filtered", recommendationController.filterReviews);
router.post("/favorites/:businessId", isAuth, recommendationController.addToFavorites);
router.delete("/favorites/:businessId", isAuth, recommendationController.removeFromFavorites);
router.get("/favorites", isAuth, recommendationController.getFavorites);
router.get("/favorites/recommendations", isAuth, recommendationController.getRecommendationsFromFavorites);
router.get("/top-rated", recommendationController.getTopRatedBusinesses);
router.get("/category/:category", recommendationController.getBusinessesByCategory);
router.get("/user-sentiment", isAuth, recommendationController.getUserSentiment);
router.get("/personalized-categories", isAuth, recommendationController.getPersonalizedCategoryRecommendations);

module.exports = router;