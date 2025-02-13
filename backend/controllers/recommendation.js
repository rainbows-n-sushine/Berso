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
      const hasBadWords = tokens.some(token => isOffensive(token));

      const isLongEnough = combinedText.length >= 10;
      const hasMinimumRating = review.rating >= 1;
      const isRecentReview = isReviewRecent(review.createdAt);

      return !hasBadWords && isLongEnough && hasMinimumRating && isRecentReview;
    });

    const sortedReviews = filteredReviews.sort((a, b) => {
      const sentimentA = analyzer.getSentiment(tokenizer.tokenize((a.title + ' ' + a.description).toLowerCase()));
      const sentimentB = analyzer.getSentiment(tokenizer.tokenize((b.title + ' ' + b.description).toLowerCase()));
    
      const tokensA = tokenizer.tokenize((a.title + ' ' + a.description).toLowerCase());
      const tokensB = tokenizer.tokenize((b.title + ' ' + b.description).toLowerCase());
    
      const containsKeywordsA = tokensA.some(token => ['great', 'excellent', 'good'].includes(token));
      const containsKeywordsB = tokensB.some(token => ['great', 'excellent', 'good'].includes(token));
    
      if (containsKeywordsA && !containsKeywordsB) {
        return -1; // Review A has keywords and Review B doesn't, so A should come first
      } else if (!containsKeywordsA && containsKeywordsB) {
        return 1; // Review B has keywords and Review A doesn't, so B should come first
      } else if (sentimentA !== sentimentB) {
        return sentimentB - sentimentA; // Sort by sentiment in descending order
      } else {
        const relevanceA = calculateRelevance(a);
        const relevanceB = calculateRelevance(b);
        return relevanceB - relevanceA;
      }
    });

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedReviews = sortedReviews.slice(startIndex, endIndex);

    res.json({
      success: true,
      reviews: paginatedReviews,
      currentPage: page,
      totalPages: Math.ceil(sortedReviews.length / limit),
      totalReviews: sortedReviews.length
    });
  } catch (error) {
    console.error("Error filtering reviews:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

function isReviewRecent(createdAt) {
  const reviewDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDifference = currentDate - reviewDate;
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  const recentThreshold = 30; 
  return daysDifference <= recentThreshold;
}

function isOffensive(word) {
  const badWords = ['badword1', 'badword2', 'badword3'];
  return badWords.includes(word);
}

function calculateRelevance(review) {
  const upvotes = review.upvotes || 0;
  const downvotes = review.downvotes || 0;
  const totalVotes = upvotes + downvotes;
  const relevanceScore = totalVotes > 0 ? (upvotes - downvotes) / totalVotes : 0;
  return relevanceScore;
}

async function getUserPreferences(userId) {
  try {
    const user = await User.findById(userId).populate("favorites");
    const favoriteBusinesses = user.favorites;
    if (!user) {
      throw new Error("User not found");
    }

    for (const business of favoriteBusinesses) {
      const categories = business.category;

      for (const category of categories) {
        if (userPreferences[category]) {
          userPreferences[category] += 5;
        } else {
          userPreferences[category] = 5;
        }
      }
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

exports.addToFavorites = async (req, res) => {
  try {
    const userId = req.user._id;
    const businessId = req.params.businessId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    if (!user.favorites.includes(businessId)) {
      user.favorites.push(businessId);
      await user.save();
    }

    res.json({ success: true, message: "Business added to favorites" });
  } catch (error) {
    console.error("Error adding business to favorites:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.removeFromFavorites = async (req, res) => {
  try {
    const userId = req.user._id;
    const businessId = req.params.businessId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    user.favorites = user.favorites.filter(id => id.toString() !== businessId);
    await user.save();

    res.json({ success: true, message: "Business removed from favorites" });
  } catch (error) {
    console.error("Error removing business from favorites:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("favorites");
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.json({ success: true, favorites: user.favorites });
  } catch (error) {
    console.error("Error getting user favorites:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.getRecommendationsFromFavorites = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("favorites");
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const favoriteBusinesses = user.favorites;
    const similarBusinesses = await getSimilarBusinesses(favoriteBusinesses);

    res.json({ success: true, recommendations: similarBusinesses });
  } catch (error) {
    console.error("Error getting recommendations from favorites:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

async function getSimilarBusinesses(favoriteBusinesses) {
  try {
    const businessIds = favoriteBusinesses.map(business => business._id);
    const similarBusinesses = await Business.find({
      _id: { $nin: businessIds },
      category: { $in: favoriteBusinesses.map(business => business.category).flat() }
    });
    return similarBusinesses;
  } catch (error) {
    console.error("Error getting similar businesses:", error);
    throw error;
  }
}

exports.getTopRatedBusinesses = async (req, res) => {
  try {
    const topRatedBusinesses = await Business.aggregate([
      {
        $lookup: {
          from: "ratings",
          localField: "_id",
          foreignField: "business",
          as: "ratings"
        }
      },
      {
        $project: {
          _id: 1,
          name: 1,
          category: 1,
          avgRating: { $avg: "$ratings.rating" }
        }
      },
      {
        $sort: { avgRating: -1 }
      },
      {
        $limit: 10
      }
    ]);

    res.json({ success: true, businesses: topRatedBusinesses });
  } catch (error) {
    console.error("Error getting top-rated businesses:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.getBusinessesByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const businesses = await Business.find({ category: category });

    res.json({ success: true, businesses: businesses });
  } catch (error) {
    console.error("Error getting businesses by category:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.getUserSentiment = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate("reviews");
    
    const reviews = user.reviews.map(review => review.description);
    const sentimentScores = reviews.map(review => analyzer.getSentiment(tokenizer.tokenize(review.toLowerCase())));
    
    const averageSentiment = sentimentScores.reduce((sum, score) => sum + score, 0) / sentimentScores.length;
    
    res.json({ success: true, sentiment: averageSentiment });
  } catch (error) {
    console.error("Error analyzing user sentiment:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.getPersonalizedCategoryRecommendations = async (req, res) => {
  try {
    const userId = req.user._id;
    const userPreferences = await getUserPreferences(userId);
    
    const categoryScores = {};
    for (const category in userPreferences) {
      categoryScores[category] = userPreferences[category];
    }
    
    const sortedCategories = Object.keys(categoryScores).sort((a, b) => categoryScores[b] - categoryScores[a]);
    const topCategories = sortedCategories.slice(0, 5);
    
    res.json({ success: true, categories: topCategories });
  } catch (error) {
    console.error("Error generating personalized category recommendations:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};