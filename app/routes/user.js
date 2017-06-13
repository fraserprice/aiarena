const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const passport = require('passport');
const User = require('../models/user');
const Verification = require('../auth/verification');

router.get('/:username', (req, res) => {
  const username = req.params.username;
  User.findOne({'username': username}, (err, user) => {
    if(err) {
      console.log("User not found");
      res.send(404);
    }

    Verification.getCurrentUser(req, (err, currentUser) => {
      if (err) {
        console.log("user: unauthorized");
        res.status(401).end();
      }

      if(currentUser.username !== username) {
        let publicUserDetails = {username: username};
        res.json(publicUserDetails);
      } else {
        res.json(currentUser);
      }
    });
  });
});

module.exports = router;

