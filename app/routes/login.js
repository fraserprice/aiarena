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

    if (!token) {
      console.log('Invalid credentials');
      return res.status(401).end();
    } else {
      console.log(user);
      return res.json({
        success: true,
        message: "You have successfully logged in",
        token: token,
        user: user
      });
    }
  })(req, res, next);
});

module.exports = router;

