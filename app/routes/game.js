const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const passport = require('passport');
const Submission = require('../models/submission');
const User = require('../models/user');
const Verification = require('../auth/verification');

router.post('/add', (req, res) => {
  const name_ = req.body.name;
  const type_ = req.body.type;
  Verification.getCurrentUser(req, (err, currentUser) => {
    if (err) {
      console.log("Verification error: user not found");
      res.status(404).end();
    }

    const submission = new Submission;
    submission.name = name_;
    submission.type = type_;

    User.update(
      { _id: currentUser._id },
      { $push: { submissions: submission } },
      function(err, model) {
        console.log(err);
      }
    );

    res.status(200).end();
  });
});

module.exports = router;
