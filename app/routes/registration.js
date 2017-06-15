const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const passport = require('passport');

router.post('/', (req, res, next) => {
  return passport.authenticate('local.register', (err, user, msg) => {
    if (err) {
      console.log('Registration error');
      return res.status(500).end();
    }

    if (!user) {
      return res.status(500).end();
    }

    return res.status(200).json({
      success: true,
      message: msg.message
    });
  })(req, res, next);
});

module.exports = router;
