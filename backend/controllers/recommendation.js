const { Business } = require("../models/business");
const { Review } = require("../models/review");
const { RecommendationClient } = require('@algolia/recommend');
const natural = require('natural');
const TfIdf = natural.TfIdf;
const brain = require('brain.js');
const { User } = require("../models/user");

exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user._id;

    const recommendationClient = new RecommendationClient({
      applicationID: 'ALGOLIA_APPLICATION_ID',
      apiKey: 'ALGOLIA_API_KEY',
      indexName: 'ALGOLIA_INDEX_NAME',
    });

    const cfRecommendations = await recommendationClient.getRecommendations([
      {
        indexName: 'YOUR_ALGOLIA_INDEX_NAME',
        objectID: userId,
        model: 'bought-together',
        maxRecommendations: 10,
      },
    ]);

    const userPreferences = await getUserPreferences(userId);
    const tfidf = new TfIdf();
    const businesses = await Business.find();
    businesses.forEach(business => {
      tfidf.addDocument(business.description);
    });
    const cbRecommendations = businesses.map(business => {
      const similarity = tfidf.tfidf(userPreferences, business.description);
      return { business, similarity };
    });
    cbRecommendations.sort((a, b) => b.similarity - a.similarity);

    const recommendedBusinessIds = [...cfRecommendations.results[0].hits.map(hit => hit.objectID), ...cbRecommendations.map(item => item.business._id)];
    const recommendations = await Business.find({ _id: { $in: recommendedBusinessIds } });

    res.json({ success: true, recommendations });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.filterReviews = async (req, res) => {
  try {
    const businessId = req.params.businessId;

    let reviews = await Review.find({ business: businessId });

    const network = new brain.NeuralNetwork();
    network.train(labeledReviewData);
    const mlFilteredReviews = reviews.filter(review => {
      const prediction = network.run(review.comment);
      return prediction.label === 'genuine';
    });

    const rbFilteredReviews = reviews.filter(review => {
      const isGenuine = applyFilteringRules(review);
      return isGenuine;
    });

    const filteredReviews = [...mlFilteredReviews, ...rbFilteredReviews];

    res.json({ success: true, reviews: filteredReviews });
  } catch (error) {
    console.error("Error filtering reviews:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

async function getUserBusinessMatrix() {
  try {
    const users = await User.find();
    const businesses = await Business.find();

    const matrix = [];

    for (const user of users) {
      const userReviews = await Review.find({ user: user._id });
      const userRow = [];

      for (const business of businesses) {
        const userReview = userReviews.find(review => review.business.toString() === business._id.toString());
        const rating = userReview ? userReview.rating : 0;
        userRow.push(rating);
      }

      matrix.push(userRow);
    }

    return matrix;
  } catch (error) {
    console.error("Error creating user-business matrix:", error);
    throw error;
  }
}

async function getUserPreferences(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const userReviews = await Review.find({ user: userId }).populate("business");
    const userPreferences = {};

    for (const review of userReviews) {
      const business = review.business;
      const categories = business.category;

      for (const category of categories) {
        if (userPreferences[category]) {
          userPreferences[category] += review.rating;
        } else {
          userPreferences[category] = review.rating;
        }
      }
    }

    for (const category in userPreferences) {
      userPreferences[category] /= userReviews.length;
    }

    return userPreferences;
  } catch (error) {
    console.error("Error retrieving user preferences:", error);
    throw error;
  }
}

function applyFilteringRules(review) {
  // Rule 1: Minimum word count
  const minWordCount = 10;
  const wordCount = review.comment.trim().split(/\s+/).length;
  if (wordCount < minWordCount) {
    return false;
  }

  // Rule 2: Specific keywords that indicate a fake review
  const fakeKeywords = ["fake", "scam", "fraud", "not genuine"];
  const reviewText = review.comment.toLowerCase();
  for (const keyword of fakeKeywords) {
    if (reviewText.includes(keyword)) {
      return false;
    }
  }

  // Rule 3: Rating consistency with comment sentiment
  const sentiment = analyzeSentiment(review.comment);
  const ratingThreshold = 3;
  if (
    (sentiment === "positive" && review.rating < ratingThreshold) ||
    (sentiment === "negative" && review.rating >= ratingThreshold)
  ) {
    return false;
  }

  // Ezi gar we can add more rules based on other code written

  return true;
}

exports.getPersonalizedRecommendations = async (req, res) => {
  try {
    const userId = req.user._id;
    const userPreferences = await getUserPreferences(userId);

    const businesses = await Business.find();
    const recommendedBusinesses = [];

    for (const business of businesses) {
      const score = calculateRecommendationScore(business, userPreferences);
      recommendedBusinesses.push({ business, score });
    }

    recommendedBusinesses.sort((a, b) => b.score - a.score);
    const topRecommendations = recommendedBusinesses.slice(0, 10).map(item => item.business);

    res.json({ success: true, recommendations: topRecommendations });
  } catch (error) {
    console.error("Error generating personalized recommendations:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

function calculateRecommendationScore(business, userPreferences) {
  let score = 0;

  for (const category in userPreferences) {
    if (business.category.includes(category)) {
      score += userPreferences[category];
    }
  }

  return score;
}
