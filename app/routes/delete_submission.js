const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const passport = require('passport');
const Submission = require('../models/submission');
const User = require('../models/user');
const Code = require('../models/code');
const Verification = require('../auth/verification');

router.post('/submission', (req, res) => {
  const dbID = req.body.dbID;
  Verification.getCurrentUser(req, (err, currentUser) => {
    if (err) {
      console.log("Verification error: user not found");
      res.status(404).end();
      return;
    }

    User.update(
      { _id: currentUser._id },
      { $pull: { submissions: { dbID: dbID } } },
      function(err, model) {
        if (err) {
          console.log(err);
        }
      }
    );

    Code.remove({ _id: dbID },
      function(err) {
        if (err) {
          console.log(err);
        }
      }
    );

    res.status(200).end();
  });
});

module.exports = router;
