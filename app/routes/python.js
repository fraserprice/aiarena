const express = require('express');
const Stream = require('stream');
const request = require('request');
const mongodb = require('mongodb');
const Verification = require('../auth/verification');
const Game = require('../models/game');
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
      Game.findOne({'id': user.currentGame.id}, (err, game) => {
        if(err) {
          return res.sendStatus(503);
        }
        if(game.playerOne.username === user.username) {
          game.playerOne.code = userCode;
        } else {
          game.playerTwo.code = userCode;
        }
        game.save((err, data) => {
          if(err) {
            console.log("Could not upload code");
            return res.sendStatus(503);
          }
          request({
            //url: "http://ec2-52-91-239-221.compute-1.amazonaws.com:8080/python",
            url: "http://localhost:8080/python",
            method: "POST",
            json: true,
            body: myJSONObject
          }, function (error, response, body) {
            //console.log(JSON.stringify(body));
            return res.json({payload: JSON.stringify(body)});
          });
        });
      });
    }
  });
});

module.exports = router;
