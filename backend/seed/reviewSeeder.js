const mongoose = require('mongoose');
const {Review} = require('../models/review');
const {User} = require('../models/user'); 
const {Business} = require('../models/business'); 

const seedReviews = async () => {
    try {
      
        const users = await User.find();
        const businesses = await Business.find();

        if (users.length === 0 || businesses.length === 0) {
            console.log("Insufficient data to seed reviews. Ensure users and businesses exist.");
            return;
        }

        const reviews = [
            {
                title: 'Fantastic Service!',
                description: 'The service provided by this business was amazing. I highly recommend them!',
                user: users[0]._id,
                business: businesses[0]._id,
            },
            {
                title: 'Good Experience',
                description: 'The business was good, but there is room for improvement. Overall, a positive experience.',
                user: users[1]._id,
                business: businesses[1]._id,
            },
            {
                title: 'Disappointing',
                description: 'I had high expectations, but the service was not as great as I thought it would be.',
                user: users[1]._id,
                business: businesses[1]._id,
            },
        ];

       
          try {
                    await Review.deleteMany();
                    const reviewsSeeded = await Review.insertMany(reviews);
                    console.log("Reviews seeded:", reviewsSeeded.map(r => r.title));
                  } catch (err) {
                    console.error("Seeding error in seeding reviews:", err);
                  }

    } catch (err) {
        console.error('Error seeding reviews:', err);
    }
};

module.exports = seedReviews;
