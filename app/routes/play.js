const express = require('express');
const Stream = require('stream');
const request = require('request');
const mongodb = require('mongodb');
const Verification = require('../auth/verification');
const Code = require('../models/code');
const router = express.Router();

router.post('/', (req, res) => {
  const enemyCodeID = req.body.enemyID;
  const userCodeID = req.body.codeID;
  const clientID = req.body.clientID;
  Verification.getCurrentUser(req, (err, user) => {
    if(err) {
      console.lgo("Verification failed");
    } else {
      Code.findById(userCodeID, (err, code) => {
        if (err) {
          console.log("code with id: " + userCodeID + " has not been found!");
          res.status(404).end();
        }

        const myJSONObject = { payload : code.code, clientID : clientID };
        request({
            url: "http://ec2-52-91-239-221.compute-1.amazonaws.com:8080/python",
            method: "POST",
            json: true,
            body: myJSONObject
          }, function (error, response, body) {
            //console.log(JSON.stringify(body));
            //return res.json({payload: JSON.stringify(body)});
        });

        res.status(200).end();
      });
      /*Game.findOne({'id': user.currentGame.id}, (err, game) => {*/
        //if(err) {
          //return res.sendStatus(503);
        //}
        //if(game.playerOne.username === user.username) {
          //game.playerOne.code = userCode;
        //} else {
          //game.playerTwo.code = userCode;
        //}
        //game.save((err, data) => {
          //if(err) {
            //console.log("Could not upload code");
            //return res.sendStatus(503);
          //}
          //request({
            //url: "http://ec2-52-91-239-221.compute-1.amazonaws.com:8080/python",
            ////url: "http://localhost:8080/python",
            //method: "POST",
            //json: true,
            //body: myJSONObject
          //}, function (error, response, body) {
            ////console.log(JSON.stringify(body));
            //return res.json({payload: JSON.stringify(body)});
          //});
        //});
      /*});*/
    }
  });
});

module.exports = router;
