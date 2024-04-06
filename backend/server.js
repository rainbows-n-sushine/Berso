const bodyParser = require("body-parser");
const express = require("express");
const app = express();
require("dotenv").config();
const User = require("./models/user");
require("./models/db");
const cors = require("cors");

app.use(cors({ origin: "http://localhost:8081" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/signup/create-user", async (req, res) => {

const {fullName,username,email,dateOfBirth,zipCode,password}=req.body;

console.log(fullName + " "+username+" "+email+" "+dateOfBirth+" "+zipCode+" "+password)
  // const email = "jalal@gmail.com";
  const isNewUser = await User.isUniqueCredentials(email,username);
  const user = await User({
    name: fullName,
    dob:dateOfBirth,
    zip_code:zipCode,
    email: email,
    password: password,
    username: username,
  });
  await user.save();
console.log()
  if (!isNewUser.email && !isNewUser.username) {
    return res.json({
      success: false,
      message: "This email and username is already in use, try sign-in",
    });
  } 
  else if (!isNewUser.email)
  {
    return res.json({
      success: false,
      message: "This email is already in use, try sign-in",
    });
    
  }
  else if (!isNewUser.username)
  {
    return res.json({
      success: false,
      message: "This email is already in use, try sign-in",
    });
    
  }
  else {
    return res.json(user);
    // return res.json({ success: true, message: "Check your email" });
  }
});

app.post("/auth/user-sign-in", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email: email } }).then((user) => {
    if (!user) {
      res.send("There is no user registered under that email");
    } else {
      if (user.password === password) {
        res.send(true);
      } else {
        res.send(false);
      }
    }
  });
});

app.listen(8000, () => {
  console.log("Server is running successfully");
});

app.get("/", (req, res) => {
  console.log("Hello world");
  res.send('<h1 style="color:pink; background-color:hotpink;">Hello world</h1>');
});