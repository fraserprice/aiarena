const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const passport = require('passport');

router.post('/', (req, res, next) => {
  console.log("...");
  return passport.authenticate('local.login', (err, token, user) => {
    if (err) {
      if (err.name === "IncorrectCredentialsError") {
        console.log("IncorrectCredentialsError");
        return res.status(400).end();
      }

      console.log("Login auth error");
      return res.status(400).end();
    }

    console.log("logging successful");
    return res.json({
      success: true,
      message: "You have successfully logged in",
      token: token,
      user: user
    });
  })(req, res, next);
});

module.exports = router;

