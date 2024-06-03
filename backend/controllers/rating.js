const Rating = require('../models/rating')
import { Business } from '../models/business';
import { updateBusinessRating } from './business';

exports.createRating = async (req, res) => {
  try {
    const { businessId, rating } = req.body;
    const userId = req.user._id;

    const _rating = new Rating({
      user: userId,
      business: businessId,
      rating
    });

    await _rating.save();
    await updateBusinessRating(businessId, _rating);

    res.status(201).json({ success: true, message: "Review created successfully" });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.getRatingsByBusiness = async (req, res) => {
  try {
    const { businessId } = req.params;

    const business = await Business.find({_id: businessId});
    if (!business) {
      return res.status(404).json({ success: false, error: "Business not found" });
    }

    if (business) {
      const rating = business.rating;
      return res.json(200).json({ success: true, rating} )
    }

  } catch (error) {
    console.error("Error retrieving reviews:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

//update ratings of a business by same user