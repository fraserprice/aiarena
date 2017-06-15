const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const passport = require('passport');
const Submission = require('../models/submission');
const Code = require('../models/code');
const User = require('../models/user');
const Verification = require('../auth/verification');

router.post('/code', (req, res) => {
  Verification.getCurrentUser(req, (err, currentUser) => {
    if (err) {
      console.log("Verification error: user not found");
      res.status(404).end();
      return;
    }

    const dbID = req.body.dbID;
    const new_code = req.body.new_code;
    console.log(new_code);
    Code.update(
      {_id: dbID},
      {$set: {code: new_code}},
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
