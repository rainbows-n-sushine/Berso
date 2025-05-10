const {Rating} = require('../models/rating'); 
const {User} = require('../models/user');
const {Business} = require('../models/business');

const seedRatings = async () => {
  try {
    const users = await User.find();
    const businesses = await Business.find();

    if (users.length === 0 || businesses.length === 0) {
      console.log("Users or businesses not found. Ratings seed skipped.");
      return;
    }

    const ratings = [
      {
        user: users[0]._id,
        business: businesses[0]._id,
        rating: 5,
      },
      {
        user: users[1]._id,
        business: businesses[1]._id,
        rating: 3,
      }
    ];

      try {
            await Rating.deleteMany();
            const createdRatings = await Rating.insertMany(ratings);
            console.log("Ratings seeded:", createdRatings.map(b => r.rating));
          } catch (err) {
            console.error("Seeding error in seeding ratings:", err);
          }
   
  } catch (error) {
    console.error("Failed to seed ratings:", error);
  }
};

module.exports = seedRatings;
