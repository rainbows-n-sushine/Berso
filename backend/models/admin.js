const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    // required:true
  },
  password: {
    type: String,
    // required:true
},

username:{
    type:String,
    // required:true,
    unique: true,
  },
  email: {
    type: String,
    // required:true,
    unique: true,
  },
  zip_code: {
    type: String,
    // required:true,
  },
  dob: {
    type: String,
    // required:true,
  },
 
  date:{
    type:Date,
    default:Date.now()
  },

  // profilepic: {
  //   data: Buffer,
  //   contentType: String,
  // },

});

adminSchema.statics.isUniqueCredentials = async function (email, username) {
  console.log("email n username check credentials");

  if (!email) throw new Error("invalid email");

  if (!username) throw new Error("Invalid username");
  const emailExists = await this.findOne({ email });
  const usernameExists = await this.findOne({ username });
  const uniqueCredentials = { email: true, username: true };

  try {
    if (emailExists) {
      uniqueCredentials.email = false;
      console.log("email exists");
    }
    if (usernameExists) {
      uniqueCredentials.username = false;
      console.log("username exists");
    }
    return uniqueCredentials;
  } catch (error) {
    console.log("Error inside the isuniqueCredentials method: ", error.message);
    return uniqueCredentials;
  }
};


adminSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    bcrypt.hash(this.password, 8, (err, hash) => {
      if (err) {
        return next(err); // Pass the error to the next middleware function
      }

      this.password = hash;
      next();
    });
  } else {
    next(); // Call next() if password is not modified
  }
});

// userSchema.pre("findOneAndUpdate", function (next) {
//   if (this.isModified("password")) {
//     bcrypt.hash(this.password, 8, (err, hash) => {
//       if (err) return next(err);

//       this.password = hash;
//       next();
//     });
//   }
// });
adminSchema.methods.comparePassword = async function (password) {
  if (!password) {
    throw new Error("Password is missing, cannot compare!");
  }
  console.log("Comparing passwords...");
  try {
    console.log(password + " " + this.password);
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (err) {
    console.log("Error while comparing password: ", err.message);
    throw err; // Re-throw the error to propagate it further if needed
  }
};

adminSchema.methods.comparePassword = async function (password) {
  if (!password) throw new error("password is mission, cannot compare!");
  console.log("im comparing password");

  try {
    console.log(password + " " + this.password);
    const result = await bcrypt.compare(password, this.password);
    console.log("comparing done");
    return result;
  } catch (err) {
    console.log("Error while comparing password: ", err.message);
    throw err;
  }
};

adminSchema.statics.adminExists = async function (credential, password) {
  const credenetialInUse = false;
  if (!credential) throw new Error("invalid email");
  console.log(credential);

  const emailInUse = await this.findOne({ email: credential });

  if (emailInUse) {
    console.log("Email is already in use");
    const correctPassword = await this.findOne({ password });

    return true;
  } else {
    return false;
  }
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = { Admin };
