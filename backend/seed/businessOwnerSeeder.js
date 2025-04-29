const bcrypt = require('bcryptjs');
const { BusinessOwner } = require('../models/businessOwner');  // Update path as necessary
const generatePassword =require('../utils/generatePassword')
async function seedBusinessOwners() {
  try {

    const password="password123"
    const hashedPassword= await generatePassword(password)


    const sampleBusinessOwners = [
      {
        name: "John Doe",
        username: "john_doe123",
        email: "john@example.com",
        password:hashedPassword,  
        zip_code: "12345",
        dob: "1985-04-12",
        bio: "Experienced business owner in the retail sector.",
        // profilepic: {
        //   data: Buffer.from('sampleprofilepicdata'),
        //   contentType: 'image/png'
        // }
      },
      {
        name: "Jane Smith",
        username: "jane_smith456",
        email: "jane@example.com",
        password: hashedPassword,  // Plaintext password to hash
        zip_code: "67890",
        dob: "1990-06-25",
        bio: "Passionate about fitness and wellness businesses.",
        // profilepic: {
        //   data: Buffer.from('sampleprofilepicdata'),
        //   contentType: 'image/png'
        // }
      }
    ];

    // for (let owner of sampleBusinessOwners) {
    //   owner.password = await bcrypt.hash(owner.password, 10); // Hashing password
    // }

    try {
      await BusinessOwner.deleteMany(); // Clean slate
      const createdBusinessOwners = await BusinessOwner.insertMany(sampleBusinessOwners);
      console.log("Business owners  seeded:", createdBusinessOwners.map(bo => bo.username));
    } catch (err) {
      console.error("Seeding error in business owners seeder:", err);
    }
    // const existingOwners = await BusinessOwner.find();
    // if (existingOwners.length === 0) {
    //   await BusinessOwner.insertMany(sampleBusinessOwners);
    //   console.log("Business owners seeded successfully!");
    // } else {
    //   console.log("Business owners already exist in the database.");
    // }
  } catch (err) {
    console.error("Error seeding business owners:", err);
  }
}

module.exports = seedBusinessOwners;
