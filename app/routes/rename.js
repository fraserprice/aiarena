const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const passport = require('passport');
const Submission = require('../models/submission');
const User = require('../models/user');
const Code = require('../models/code');
const Verification = require('../auth/verification');

router.post('/rename', (req, res) => {
  Verification.getCurrentUser(req, (err, currentUser) => {
    if (err) {
      console.log("Verification error: user not found");
      res.status(404).end();
      return;
    }

    const dbID = req.body.dbID;
    const new_name = req.body.new_name;
    const submissions = currentUser.submissions;

    submissions.filter(function(sub) {
        if (sub.dbID === dbID) {
          sub.name = new_name;
        }
    });

    User.update(
      { _id: currentUser._id },
      {submissions : submissions},
      function(err, model) {
        if (err) {
          console.log(err);
        }
      }
    );

    res.status(200).end();
  });
});

module.exports = router;
