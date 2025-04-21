const connectWithRetry = require("./models/db");
const seedAdmins = require("./seed/adminSeeder");
const seedCategories=require('./seed/categorySeeder')
const seedBusinessOwners=require("./seed/businessOwnerSeeder")

const runSeeder = async () => {
  await connectWithRetry();
  await seedAdmins();
  await seedCategories();
  await seedBusinessOwners();
  process.exit(); // exit after seeding
};

runSeeder();
