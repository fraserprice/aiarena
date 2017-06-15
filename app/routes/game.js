const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const passport = require('passport');
const Submission = require('../models/submission');
const User = require('../models/user');
const Code = require('../models/code');
const Verification = require('../auth/verification');

router.post('/add', (req, res) => {
  const name_ = req.body.name;
  const type_ = req.body.type;
  Verification.getCurrentUser(req, (err, currentUser) => {
    if (err) {
      console.log("Verification error: user not found");
      res.status(404).end();
      return;
    }

    const code = new Code();
    code.user = currentUser.username;
    code.code = "def main:\n\t# Start writing here";
    code.save();

    const submission = new Submission;
    submission.name = name_;
    submission.type = type_;
    console.log('creating sub with dbID: ' + code._id);
    submission.dbID = code._id;

    User.update(
      { _id: currentUser._id },
      { $push: { submissions: submission } },
      function(err, model) {
        console.log(err);
      }
    );

    res.status(200).json({dbID: submission.dbID});
  });
});

module.exports = router;
