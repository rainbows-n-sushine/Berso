const { Business } = require("../models/business");
const { Review } = require("../models/review");
const { Rating } = require("../models/rating");
const brain = require('brain.js');
const { User } = require("../models/user");
const natural = require('natural');
const tokenizer = new natural.WordTokenizer();
const Analyzer = natural.SentimentAnalyzer;
const stemmer = natural.PorterStemmer;
const analyzer = new Analyzer("English", stemmer, "afinn");


exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user._id;

    const userPreferences = await getUserPreferences(userId);
    const businesses = await Business.find();

    const tfidfScores = calculateTFIDF(businesses);
    const userVector = createUserVector(userPreferences, tfidfScores);

    const recommendedBusinesses = businesses.map(business => {
      const businessVector = createBusinessVector(business, tfidfScores);
      const similarity = cosineSimilarity(userVector, businessVector);
      return { business, similarity };
    });

    recommendedBusinesses.sort((a, b) => b.similarity - a.similarity);
    const topRecommendations = recommendedBusinesses.slice(0, 10).map(item => item.business);

    res.json({ success: true, recommendations: topRecommendations });
  } catch (error) {
    console.error("Error generating recommendations:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.filterReviews = async (req, res) => {
  try {
    const businessId = req.params.businessId;
    const reviews = await Review.find({ business: businessId }).populate('comment');

    const filteredReviews = reviews.filter(review => {
      const reviewText = review.title + ' ' + review.description;
      const commentText = review.comment ? review.comment.text : '';
      const combinedText = reviewText + ' ' + commentText;

      const tokens = tokenizer.tokenize(combinedText.toLowerCase());
      const sentiment = analyzer.getSentiment(tokens);

      const isPositiveSentiment = sentiment >= 0;
      const containsKeywords = tokens.some(token => ['great', 'excellent', 'good'].includes(token));

      return isPositiveSentiment && containsKeywords;
    });

    res.json({ success: true, reviews: filteredReviews });
  } catch (error) {
    console.error("Error filtering reviews:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
// async function getUserBusinessMatrix() {
//   try {
//     const users = await User.find();
//     const businesses = await Business.find();

//     const matrix = [];

//     for (const user of users) {
//       const userReviews = await Review.find({ user: user._id });
//       const userRow = [];

//       for (const business of businesses) {
//         const userReview = userReviews.find(review => review.business.toString() === business._id.toString());
//         const rating = userReview ? userReview.rating : 0;
//         userRow.push(rating);
//       }

//       matrix.push(userRow);
//     }

//     return matrix;
//   } catch (error) {
//     console.error("Error creating user-business matrix:", error);
//     throw error;
//   }
// }

async function getUserPreferences(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const userRating = await Rating.find({ user: userId }).populate("business");
    const userPreferences = {};

    for (const rating of userRating) {
      const business = rating.business;
      const _business = await Business.findById(business);
      const categories = _business.category;

      for (const category of categories) {
        if (userPreferences[category]) {
          userPreferences[category] += rating.rating;
        } else {
          userPreferences[category] = rating.rating;
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
  const wordCount = review.description.trim().split(/\s+/).length;
  if (wordCount < minWordCount) {
    return false;
  }

  // Rule 2: Specific keywords that indicate a fake review
  const fakeKeywords = ["fake", "scam", "fraud", "not genuine"];
  const reviewText = review.description.toLowerCase();
  for (const keyword of fakeKeywords) {
    if (reviewText.includes(keyword)) {
      return false;
    }
  }

  // Rule 3: Rating consistency with comment sentiment
  const sentiment = analyzeSentiment(review.description);
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

function calculateTFIDF(businesses) {
  const tfidfScores = {};
  const totalDocuments = businesses.length;

  businesses.forEach(business => {
    const words = business.description.toLowerCase().split(/\W+/);
    const wordFrequency = {};

    words.forEach(word => {
      if (word) {
        if (wordFrequency[word]) {
          wordFrequency[word]++;
        } else {
          wordFrequency[word] = 1;
        }
      }
    });

    Object.keys(wordFrequency).forEach(word => {
      const tf = wordFrequency[word] / words.length;
      const documentsWithWord = businesses.filter(b => b.description.toLowerCase().includes(word)).length;
      const idf = Math.log(totalDocuments / (1 + documentsWithWord));
      const tfidf = tf * idf;

      if (tfidfScores[word]) {
        tfidfScores[word].push({ business: business._id, score: tfidf });
      } else {
        tfidfScores[word] = [{ business: business._id, score: tfidf }];
      }
    });
  });

  return tfidfScores;
}

function createUserVector(userPreferences, tfidfScores) {
  const userVector = {};

  for (const category in userPreferences) {
    const words = category.toLowerCase().split(/\W+/);
    words.forEach(word => {
      if (tfidfScores[word]) {
        userVector[word] = userPreferences[category];
      }
    });
  }

  return userVector;
}

function createBusinessVector(business, tfidfScores) {
  const businessVector = {};

  const words = business.description.toLowerCase().split(/\W+/);
  words.forEach(word => {
    if (tfidfScores[word]) {
      const tfidfScore = tfidfScores[word].find(item => item.business.toString() === business._id.toString());
      if (tfidfScore) {
        businessVector[word] = tfidfScore.score;
      }
    }
  });

  return businessVector;
}

function cosineSimilarity(vector1, vector2) {
  const dotProduct = Object.keys(vector1).reduce((sum, key) => sum + (vector1[key] || 0) * (vector2[key] || 0), 0);
  const magnitude1 = Math.sqrt(Object.keys(vector1).reduce((sum, key) => sum + Math.pow(vector1[key] || 0, 2), 0));
  const magnitude2 = Math.sqrt(Object.keys(vector2).reduce((sum, key) => sum + Math.pow(vector2[key] || 0, 2), 0));
  return dotProduct / (magnitude1 * magnitude2);
}