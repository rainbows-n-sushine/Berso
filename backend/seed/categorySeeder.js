const { Category } = require('../models/category');

async function seedCategories() {
  try {
    const sampleCategories = [
        {
            name: "Fitness Centers",
            description: "Gyms, yoga studios, and places for physical training and fitness.",
            icon: "faDumbbell"
          },
          {
            name: "Entertainment",
            description: "Cinemas, amusement parks, and other places for fun and recreation.",
            icon: "faFilm"
          },
      {
        name: "Retail",
        description: "Shops selling various products, including clothing, electronics, and groceries.",
        icon: "faStore"
      },
      {
        name: "Tech & Services",
        description: "Businesses providing tech solutions and services.",
        icon: "faLaptop"
      }
    ];

    // Check if categories already exist to avoid duplicate seeding
    const existingCategories = await Category.find();
    if (existingCategories.length === 0) {
      await Category.insertMany(sampleCategories);
      console.log("Categories seeded successfully!");
    } else {
      console.log("Categories already exist in the database.");
    }
  } catch (err) {
    console.error("Error seeding categories:", err);
  }
}

module.exports = seedCategories;
