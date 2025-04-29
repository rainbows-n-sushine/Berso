const bodyParser = require("body-parser");
const express = require("express");
const app = express();
require("dotenv").config();
const cookieSession = require("cookie-session");
const connectWithRetry= require('./models/db')
const passport = require("passport");
const origin=process.env.ORIGIN || "http://localhost:8081";
const PORT=process.env.PORT||8000
const admin=process.env.ADMIN || "http://localhost:3000"
const cors = require("cors");
const path=require("path")
const fs=require("fs")

app.use(
  cookieSession({
    name: "session",
    keys: ["hello"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(
  cors({
    origin: ['*',origin,admin], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('what the helly❤️');
});

const userRoute = require("./routes/user");
app.use("/user", userRoute);

const businessOwnerRoute=require('./routes/businessOwner')
app.use('/businessOwner',businessOwnerRoute);


const businessRoute=require('./routes/business')
app.use('/business',businessRoute)

const categoryRoute=require('./routes/category')
app.use('/category',categoryRoute);

const recommendationRoute = require('./routes/recommendation');
app.use('/recommendation', recommendationRoute);

const reviewRoute = require("./routes/review");
app.use("/review", reviewRoute);

// const reviewImageRoute = require("./routes/reviewImage");
// app.use("/reviewImage",reviewImageRoute);


const ratingRoute = require("./routes/rating");
app.use("/rating", ratingRoute);


const reportRoute = require("./routes/report");
app.use("/report", reportRoute);

const adminRoute = require("./routes/admin");
app.use("/admin", adminRoute);




app.listen(PORT, () => {
  console.log("Server is running successfully");
});

connectWithRetry();
