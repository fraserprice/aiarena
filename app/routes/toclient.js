const express = require('express');
const Stream = require('stream');
const socket = require('../socket/socket');
const request = require('request');

const router = express.Router();

router.post('/', (req, res) => {
  console.log("pushing...");
  var msg = req.body.payload;
  var clientID = req.body.clientID;
  socket.pushToClient(clientID, "msg", msg);
  res.json({payload: "ok"});
});

module.exports = router;
