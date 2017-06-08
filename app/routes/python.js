const express = require('express');
const Stream = require('stream');
var request = require('request');

const router = express.Router();

router.post('/', (req, res) => {
  var userCode = req.body.payload.replace(/"/g, "\'");
  var clientID = req.body.clientID;
  var myJSONObject = { payload : userCode, clientID : clientID };
  request({
      //url: "http://ec2-52-91-239-221.compute-1.amazonaws.com:8080/python",
      url: "http://localhost:8080/python",
      method: "POST",
      json: true,
      body: myJSONObject
  }, function (error, response, body){
      console.log(JSON.stringify(body));
      res.json({payload:JSON.stringify(body)});
  });
});

module.exports = router;
