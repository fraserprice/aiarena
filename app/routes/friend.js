const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const passport = require('passport');
const User = require('../models/user');
const Verification = require('../auth/verification');

router.get('/add/:username', (req, res) => {
  const username = req.params.username;
  User.findOne({'username': username}, (err, user) => {
    if(err) {
      console.log("User not found, could not add friend");
      return res.send(404);
    }
    Verification.getCurrentUser(req, (err, currentUser) => {
      if(err) {
        console.log("Verification error");
        return res.sendStatus(401);
      } else {
        if(currentUser.friends.includes(user)) {
          console.log("Users already friends");
          return res.sendStatus(200);
        } else if(currentUser.pendingFriendRequests.includes(user.username)) {
          user.friends.push(currentUser.username);
          currentUser.friends.push(user.username);
          currentUser.pendingFriendRequests.splice(currentUser.pendingFriendRequests.indexOf(user.username), 1);
        } else {
          user.pendingFriendRequests.push(currentUser.username);
        }
        currentUser.save((err, data) => {
          if(err) {
            console.log("Could not save friend to database [1]");
            return res.sendStatus(503);
          }
          user.save((err, data) => {
            if(err) {
              console.log("Could not save to database [2]");
              //TODO: undo save of currentUser? Needs to be atomic
              return res.sendStatus(503);
            }
            console.log("Complete");
            return res.sendStatus(200);
          });

        });
      }
    });
  });
});

router.get('/delete/:username', (req, res) => {
  const username = req.params.username;
  User.findOne({'username': username}, (err, user) => {
    if(err) {
      console.log("User not found, could not delete friend");
      return res.send(404);
    }
    Verification.getCurrentUser(req, (err, currentUser) => {
      if(err) {
        console.log("Verification error");
        return res.sendStatus(401);
      } else {
        if(!currentUser.friends.includes(user)) {
          console.log("Users are not friends");
          return res.sendStatus(200);
        } else {
          user.friends.splice(user.friends.indexOf(currentUser.username), 1);
          currentUser.friends.splice(currentUser.friends.indexOf(user.username), 1);
        }
        currentUser.save((err, data) => {
          if(err) {
            console.log("Could not save friend to database [1]");
            return res.sendStatus(503);
          }
          user.save((err, data) => {
            if(err) {
              console.log("Could not save to database [2]");
              return res.sendStatus(503);
            }
            console.log("Complete");
            return res.sendStatus(200);
          });
        });
      }
    });
  });
});

module.exports = router;
