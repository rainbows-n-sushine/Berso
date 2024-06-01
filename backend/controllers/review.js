const Review = require('../models/review')
exports.createReview = async (req, res) => {
  try {
    const { businessId, rating, comment } = req.body;
    const userId = req.user._id;

    const review = new Review({
      user: userId,
      business: businessId,
      rating,
      comment,
    });

    await review.save();
    await updateBusinessRating(businessId, rating);

    res.status(201).json({ success: true, message: "Review created successfully" });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.getReviewsByBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;

    const reviews = await Review.find({ business: businessId }).populate("user", "name");

    res.json({ success: true, reviews });
  } catch (error) {
    console.error("Error retrieving reviews:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};