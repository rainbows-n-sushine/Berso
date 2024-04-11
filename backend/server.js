const bodyParser = require("body-parser");
const express = require("express");
const app = express();
require("dotenv").config();


require("./models/db");
const cors = require("cors");

app.use(cors({ origin: "http://localhost:8081" }));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const userRoute=require('./routes/user')
app.use('/user',userRoute);


app.listen(8000, () => {
  console.log("Server is running successfully");
});

