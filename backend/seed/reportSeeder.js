// seeders/reportSeeder.js
const {Report} = require('../models/report'); 
const {User} = require('../models/user');   
const {Business} = require('../models/business');

const reportTypes = [
  "Technical Issue",
  "Inappropriate Action",
  "Feature Request",
  "Business Issue",
];

const seedReports = async () => {
  const users = await User.find().limit(2);
  const businesses = await Business.find().limit(2);

  const reports = [];

  for (let i = 0; i < 5; i++) {
    if (!users[i] || !businesses[i]) break;

    reports.push({
      user: users[i]._id,
      name: users[i].name || "Anonymous",
      email: users[i].email || `user${i}@example.com`,
      description: `This is a sample report description for ${reportTypes[i % reportTypes.length]}`,
      status: i % 2 === 0 ? "unread" : "read",
      type: reportTypes[i % reportTypes.length],
    });
  }

        try {
            await Report.deleteMany();
            const createdReports = await Report.insertMany(reports);
            console.log("Reports seeded:", createdReports.map( r => r.name));
          } catch (err) {
            console.error("Seeding error in seeding reports:", err);
          }
};

module.exports = seedReports;
