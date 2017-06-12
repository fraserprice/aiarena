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
      console.log("here");
      if(err || currentUser.username !== username) {
        console.log("Finding user's details");
        let publicUserDetails = {username: username, submittedCode: user.submittedCode};
        res.json(publicUserDetails);
      } else {
        console.log("Finding your details");
        res.json(currentUser);
      }
    });
  });
});

module.exports = router;

