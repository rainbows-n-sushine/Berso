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

app.use(cors({ 
  origin: "*"
 }));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const userRoute=require('./routes/user')
app.use('/user',userRoute);

const businessRoute=require('./routes/business')
app.use('/business',businessRoute)

const categoryRoute=require('./routes/category')
app.use('/category',categoryRoute);

const recommendationRoute = require('./routes/recommendation');
app.use('/recommendation', recommendationRoute);

const reviewRoute = require("./routes/review");
app.use("/reviews", reviewRoute);

app.listen(8000, () => {
  console.log("Server is running successfully");
});

