const mongoose = require('mongoose');
const {Comment} = require('../models/comment'); 
const {User} = require('../models/user');
const {Business} = require('../models/business'); 
const {Review} = require('../models/review');

const seedComments = async () => {
    try {

    

     
        const users = await User.find();
        const businesses = await Business.find();
        const reviews = await Review.find();

        if (users.length === 0 || businesses.length === 0 || reviews.length === 0) {
            console.log("Insufficient data to seed comments. Ensure users, businesses, and reviews exist.");
            return;
        }

        // Create sample comments
        const comments = [
            {
                text: 'This is an awesome business! Great service.',
                business: businesses[0]._id,
                user: users[0]._id,
                review: reviews[0]._id,
            },
            {
                text: 'Not happy with the service, could be better.',
                business: businesses[1]._id,
                user: users[1]._id,
                review: reviews[1]._id,
            },
            {
                text: 'Amazing experience! Will come back again.',
                business: businesses[0]._id,
                user: users[0]._id,
                review: reviews[0]._id,
            },
        ];

        try {
            await Comment.deleteMany();
            const commentsSeeded = await Comment.insertMany(comments);
            console.log("Comments seeded:", commentsSeeded.map(c => c.text));
          } catch (err) {
            console.error("Seeding error in seeding comments:", err);
          }
  
    } catch (err) {
        console.error('Error seeding comments:', err);
    }
};

module.exports = seedComments;
