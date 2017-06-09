const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const passport = require('passport');
const Verification = require('../auth/verification');

router.get('/', (req, res) => {
  const user = Verification.getCurrentUser(req, (err, user) => {
    console.log(user);
    res.json(JSON.stringify(user));
  });
});

module.exports = router;

