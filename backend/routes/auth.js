const router = require("express").Router();
const passport = require("passport");
const {Success,Failure,Logout}=require('../controllers/auth')

router.get("/login/success", Success);

router.get("/login/failed",Failure);

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(	"/google/callback",
	passport.authenticate("google", {
		successRedirect: process.env.CLIENT_URL,
		failureRedirect: "/login/failed",
	})
);

router.get("/logout", Logout);

module.exports = router;
