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
    console.log(dbID);
    Code.findById(dbID, (err, code) => {
      if (err) {
        console.log("Error: could not find code with id: " + dbID);
        res.status(404).end();
      }

      const response = { raw_code: code.code };
      console.log(code.code);
      res.json(response);
    });
  });
});

module.exports = router;
