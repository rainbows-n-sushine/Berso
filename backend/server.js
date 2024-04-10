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









app.post(userRoute);

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