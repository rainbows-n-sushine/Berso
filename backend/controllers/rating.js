const {Rating} = require('../models/rating')
const { Business } = require ('../models/business')
const { updateBusinessRating } = require ('./business')

exports.createRating = async (req, res) => {
  try {


    const { businessId, rating, userId } = req.body;
    console.log('this the rating in cretaeRating :businessId ',businessId," rating : ",rating ," userId: ",userId )
    const oldRating=await Rating.findOne({user:userId,business:businessId})

    

    console.log('this is the old rating ',oldRating)
    let _rating={}


    if(oldRating!=null){

      console.log('it is an old rating: ')
       _rating = await Rating.findOneAndUpdate({user:userId,business:businessId},{
        rating
      },{new:true});
      console.l

    }else{
      console.log('it is a new rating: ')

     _rating = new Rating({
      user: userId,
      business: businessId,
      rating
    });

  }
    await _rating.save();
    
    await updateBusinessRating(businessId, rating);

    res.status(201).json({ success: true, message: "Review created successfully" });
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

exports.getBusinessRating = async (req, res) => {
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