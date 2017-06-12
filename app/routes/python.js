const express = require('express');
const Stream = require('stream');
const request = require('request');
const mongodb = require('mongodb');
const Verification = require('../auth/verification');

const router = express.Router();

router.post('/', (req, res) => {
  const userCode = req.body.payload.replace(/"/g, "\'");
  const clientID = req.body.clientID;
  const myJSONObject = { payload : userCode, clientID : clientID };
  Verification.getCurrentUser(req, (err, user) => {
    if(err) {
      console.lgo("Verification failed");
    } else {
      console.log("Saving code...");
      const submitId = user.submittedCode.length > 0 ? parseFloat(user.submittedCode[user.submittedCode.length-1].submitId) + 1 : 0;
      user.submittedCode.push({submitId: submitId, code: userCode});
      user.save((err, data) => {
        if(err) {
          console.log("Failed to save code")
          return false;
        }
        console.log("Saved code!");
        return true;
      });
      request({
        url: "http://ec2-52-91-239-221.compute-1.amazonaws.com:8080/python",
        //url: "http://localhost:8080/python",
        method: "POST",
        json: true,
        body: myJSONObject
      }, function (error, response, body) {
        //console.log(JSON.stringify(body));
        res.json({payload: JSON.stringify(body)});
      });
    }
  });
});

module.exports = router;
