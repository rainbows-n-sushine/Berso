const bcrypt = require("bcrypt");

const generatePassword = async (plainPassword, saltRounds = 10) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error generating hashed password:", error);
    throw error;
  }
};

module.exports = generatePassword;