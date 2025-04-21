const {Admin} = require("../models/admin");
const generatePassword=require("../utils/generatePassword")

const seedAdmins = async () => {
    const password1="123456"
    const hashedPassword1=await generatePassword(password1)
    const password2="abcdef"
    const hashedPassword2=await generatePassword(password2)

  const admins = [
    {
      name: "John Doe",
      username: "john_admin",
      email: "john@example.com",
      password: hashedPassword1,
      zip_code: "12345",
      dob: "1990-01-01",
    },
    {
      name: "Jane Smith",
      username: "jane_admin",
      email: "jane@example.com",
      password: hashedPassword2,
      zip_code: "67890",
      dob: "1985-05-15",
    },
  ];

  try {
    await Admin.deleteMany(); // Clean slate
    const createdAdmins = await Admin.insertMany(admins);
    console.log("Admins seeded:", createdAdmins.map(a => a.username));
  } catch (err) {
    console.error("Seeding error:", err);
  }
};

module.exports = seedAdmins;
