const { Category } = require('../models/category');

async function seedCategories() {
  try {
    const sampleCategories = [
      {
        name: "Fitness Centers",
        description: "Gyms, yoga studios, and places for physical training and fitness.",
        icon: "fitness-center"
      },
      {
        name: "Entertainment",
        description: "Cinemas, amusement parks, and other places for fun and recreation.",
        icon: "movie"
      },
      {
        name: "Retail",
        description: "Shops selling various products, including clothing, electronics, and groceries.",
        icon: "store"
      },
      {
        name: "Tech & Services",
        description: "Businesses providing tech solutions and services.",
        icon: "computer"
      },
      {
        name: "Coffee Shops",
        description: "Cafés and coffee houses where people enjoy drinks, snacks, and social time.",
        icon: "coffee"
      },
      {
        name: "Restaurants",
        description: "Places offering meals and dining experiences, from fast food to fine dining.",
        icon: "restaurant"
      },
      {
        name: "Hotels",
        description: "Hotels and resorts for accommodation, relaxation, and travel stays.",
        icon: "hotel"
      },
      {
        name: "Tour And Travel",
        description: "Tour and travel agencies offering trips, flights, and holiday packages.",
        icon: "flight"
      },
      {
        name: "Delivery",
        description: "Services offering food, goods, or package delivery to your location.",
        icon: "local-shipping"
      },
      {
        name: "Bars",
        description: "Local bars, pubs, and lounges for drinks and nightlife.",
        icon: "local-bar"
      },
      {
        name: "Spas & Salons",
        description: "Places for beauty treatments, relaxation, grooming, and self-care.",
        icon: "spa"
      },
      {
        name: "Shops",
        description: "Retail stores for a variety of products from clothes to electronics.",
        icon: "shopping-bag"
      },
    ];
    
    try {
      await Category.deleteMany();
      const createdCategories = await Category.insertMany(sampleCategories);
      console.log("Categories seeded:", createdCategories.map(c => c.name));
    } catch (err) {
      console.error("Seeding error:", err);
    }

    // Check if categories already exist to avoid duplicate seeding
    // const existingCategories = await Category.find();
    // if (existingCategories.length === 0) {
    //   await Category.insertMany(sampleCategories);
    //   console.log("Categories seeded successfully!");
    // } else {
    //   console.log("Categories already exist in the database.");
    // }
  } catch (err) {
    console.error("Error seeding categories:", err);
  }
}

module.exports = seedCategories;
