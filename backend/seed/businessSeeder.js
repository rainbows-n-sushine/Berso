const { Business } = require('../models/business');
const { BusinessOwner } = require('../models/businessOwner');
const { Category } = require('../models/category');
const fs = require("fs");
const path = require("path");


async function seedBusiness() {
  try {


    const owners = await BusinessOwner.find();
    const categories = await Category.find();

    if (!owners.length || !categories.length) {
      console.log("Please ensure BusinessOwners and Categories are seeded first.");
      return;
    }

    const sampleBusinesses = [
      {
        business_name: "Addis Coffee House",
        email: "contact@addiscoffee.et",
        phone: "+251912345678",
        website: "https://addiscoffee.et",
        location: "Addis Ababa",
        address: "Bole Medhanialem",
        business_days: "Mon-Fri",
        opening_hours: "8:00 AM - 8:00 PM",
        average_price: "75 ETB",
        description: "Cozy cafe offering Ethiopian coffee and light snacks.",
        business_owner: owners[0]._id,
        category: [categories[0]._id],
        icon: "faMugHot",
        average_rating: 4.2,
        rating_count: 35,
        latitude: 9.0108,
        longitude: 38.7613,
        review_count: 25,
        status: "approved",
        picture: {
                data: fs.readFileSync(path.join(__dirname, "../images/businesses/logo.png")),
                contentType: "image/png",
              },
      },
      {
        business_name: "Liyu Restaurant",
        email: "info@liyurestaurant.et",
        phone: "+251911112233",
        website: "https://liyurestaurant.et",
        location: "Addis Ababa",
        address: "Kazanchis",
        business_days: "Mon-Sun",
        opening_hours: "10:00 AM - 11:00 PM",
        average_price: "150 ETB",
        description: "Traditional Ethiopian cuisine with a modern twist.",
        business_owner: owners[1]?._id || owners[0]._id,
        category: [categories[1]?._id || categories[0]._id],
        icon: "faUtensils",
        average_rating: 4.6,
        rating_count: 80,
        latitude: 9.0270,
        longitude: 38.7469,
        review_count: 65,
        status: "approved",
        picture: {
          data: fs.readFileSync(path.join(__dirname, "../images/businesses/logo.png")),
          contentType: "image/png",
        },
      }
    ];

     try {
        await Business.deleteMany();
        const createdBusinesses = await Business.insertMany(sampleBusinesses);
        console.log("Businesses seeded:", createdBusinesses.map(b => b.business_name));
      } catch (err) {
        console.error("Seeding error in seeding businesses:", err);
      }
    // await Business.insertMany(sampleBusinesses);
    // console.log("Sample businesses inserted!");
  } catch (err) {
    console.error("Error seeding businesses:", err);
  } 
}

module.exports=seedBusiness;
