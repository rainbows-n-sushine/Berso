const connectWithRetry = require("./models/db");
const seedAdmins = require("./seed/adminSeeder");
const seedCategories=require('./seed/categorySeeder')
const seedBusinessOwners=require("./seed/businessOwnerSeeder")
const seedUsers=require("./seed/userSeeder");
const seedBusiness = require("./seed/businessSeeder");

const runSeeder = async () => {
  await connectWithRetry();
  await seedAdmins();
  await seedCategories();
  await seedBusinessOwners();
  await seedBusiness();
  await seedUsers()

  process.exit(); // exit after seeding
};

runSeeder();
