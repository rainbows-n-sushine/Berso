const { User } = require("../models/user");
const { Business } = require("../models/business");
const fs = require("fs");
const path = require("path");
const generatePassword = require("../utils/generatePassword");

function getRandomFavorites(businesses, count = 2) {
  const shuffled = [...businesses].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(b => b._id);
}

async function seedUsers() {
  await User.deleteMany({});
  const businesses = await Business.find();

  if (!businesses.length) {
    throw new Error("No businesses found. Seed businesses first.");
  }

  const password = "password123";
  const hashedPassword = await generatePassword(password);

  const users = [
    {
      name: "Abel Tesfaye",
      username: "abel_t",
      password: hashedPassword,
      email: "abel@example.com",
      zip_code: "1000",
      dob: "1990-01-01",
      bio: "Music lover & marketer.",
      // profilepic: "../assets/images/users/abel.jpg",
      favorites: getRandomFavorites(businesses),
    },
    {
      name: "Meklit Mekonen",
      username: "meklit_m",
      password: hashedPassword,
      email: "meklit@example.com",
      zip_code: "2000",
      dob: "1995-05-15",
      bio: "Digital marketing enthusiast.",
      // profilepic: "../assets/images/users/meklit.jpg",
      favorites: getRandomFavorites(businesses),
    },
  ];

  // await User.insertMany(users);
  // console.log("Users seeded with randomized favorites.");
   try {
      await User.deleteMany();
      const createdUsers = await User.insertMany(users);
      console.log("Users seeded:", createdUsers.map(u => u.username));
    } catch (err) {
      console.error("Seeding error in seeding users:", err);
    }
}

module.exports = seedUsers;
