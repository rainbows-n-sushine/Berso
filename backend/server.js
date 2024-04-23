const bodyParser = require("body-parser");
const express = require("express");
const app = express();
require("dotenv").config();
const cookieSession=require('cookie-session')
const passport=require('passport')


require("./models/db");
const cors = require("cors");

app.use(
  cookieSession({
name:'session',
keys:['hello'],
maxAge:24*60*60*100

  }))

  app.use(passport.initialize());
  app.use(passport.session())

// app.use(cors({ 
//   origin: "http://localhost:8081",
//   method:'GET,PUT,POST,DELETE',
//  }));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const userRoute=require('./routes/user')
app.use('/user',userRoute);

const businessRoute=require('./routes/business')
app.use('/business',businessRoute)

app.listen(8000, () => {
  console.log("Server is running successfully");
});

