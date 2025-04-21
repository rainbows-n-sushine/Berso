const {connectWithRetry} = require("./models/db");
const seedAdmins = require("./seed/adminSeeder");

const runSeeder = async () => {
  await connectWithRetry();
  await seedAdmins();
  process.exit(); // exit after seeding
};

runSeeder();
