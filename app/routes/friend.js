const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const passport = require('passport');
const User = require('../models/user');
const Game = require('../models/game');
const Friend = require('../models/friend');
const Verification = require('../auth/verification');

getUser = (req, username, callback) => {
  User.findOne({'username': username}, (err, user) => {
    if(err) {
      console.log("User not found, could not add friend");
      return res.send(404);
    }
    Verification.getCurrentUser(req, (err, currentUser) => {
      if(err) {
        console.log("Verification error");
        return res.sendStatus(401);
      }
      return callback(user, currentUser);
    });
  });
};

saveBothUsers = (user, currentUser, callback) => {
  currentUser.save((err, data) => {
    if (err) {
      console.log("Could not save to database [1]");
      return res.sendStatus(503);
    }
    user.save((err, data) => {
      if (err) {
        console.log("Could not save to database [2]");
        return res.sendStatus(503);
      }
      console.log("Complete");
      return callback();
    });
  });
};

router.get('/add/:username', (req, res) => {
  const username = req.params.username;
  getUser(req, username, (user, currentUser) => {
    if (currentUser.friends.includes(user)) {
      console.log("Users already friends");
      return res.sendStatus(200);
    } /*else if (currentUser.pendingFriendRequests.includes(user.username)) {*/
      //user.friends.push(currentUser.username);
      //currentUser.friends.push(user.username);
      //currentUser.pendingFriendRequests.splice(currentUser.pendingFriendRequests.indexOf(user.username), 1);
    //} else {
      //user.pendingFriendRequests.push(currentUser.username);
    /*}*/
    /*saveBothUsers(user, currentUser, () => {
      res.sendStatus(200);
    });*/
      else {
        const friend = new Friend();
        friend.name = username;
        friend.uid = user._id;
        friend.main = user.mainSubmission;

        User.update(
          { _id: currentUser._id },
          { $push: { friends: friend }},
          function(err, model) {
            if (err) {
              console.log("error adding friend");
              return res.status(500).end();
            }
          }
        );

        res.status(200).json({name: username, uid: friend.uid, main: friend.main});
      }
  });
});

router.get('/delete/:username', (req, res) => {
  const username = req.params.username;
  getUser(username, (user, currentUser) => {
    if(!currentUser.friends.includes(user)) {
      console.log("Users are not friends");
      return res.sendStatus(200);
    } else {
      user.friends.splice(user.friends.indexOf(currentUser.username), 1);
      currentUser.friends.splice(currentUser.friends.indexOf(user.username), 1);
    }
    saveBothUsers(user, currentUser, () => {
      res.sendStatus(200);
    });
  });
});

router.get('/challenge/:game/:username', (req, res) => {
  const game = req.params.game;
  const username = req.params.username;
  getUser(username, (user, currentUser) => {
    if(!currentUser.friends.includes(user.username)) {
      console.log("Cannot challenege user, you are not friends!");
      res.sendStatus(403);
    } else {
      let pendingChallenge = false;
      for(x in currentUser.pendingChallenges) {
        let challenge = currentUser.pendingChallenges[x];
        let challengeExpiry = new Date(challenge.date.getTime());
        challengeExpiry.setHours(challengeExpiry.getMinutes() + 5);
        if(challenge.name === username && challenge.game === game && new Date() < challengeExpiry) {
          pendingChallenge = true;
          break;
        }
      }
      if(pendingChallenge) {
        //Start new game
        let index = -1;
        for(x in currentUser.pendingChallenges) {
          let challenge = currentUser.pendingChallenges[x];
          if(challenge.name === username && challenge.game === game) {
            index = x;
            break;
          }
        }
        currentUser.pendingChallenges.splice(index, 1);
        let game = new Game();
        Game.findOne({}, {}, { sort: { 'created_at' : -1 } }, (err, lastGame) => {
          let id = -1;
          if(err) {
            id = 0;
          } else {
            id = lastGame.id + 1;
          }
          game.id = id;
          game.game = game;
          game.playerOne = {username: user.username};
          game.playerTwo = {username: currentUser.username};
          game.inProgress = true;
          game.save((err, data) => {
            if(err) {
              console.log("Could not start game");
              return res.sendStatus(503);
            }
            console.log("Game started");
            currentUser.currentGame = {active: true, id: id};
            user.currentGame = {active: true, id: id};
            saveBothUsers(user, currentUser, () => {
              console.log("Users assigned to game");
              return res.sendStatus(200);
            });
          });
        });
      } else {
        //Send challenge request
        user.pendingChallenges.push({date: new Date(), friend: currentUser.username, game: game});
        user.save((err, data) => {
          if(err) {
            console.log("Could not send challenge");
            res.sendStatus(503);
          }
          console.log("Challenege sent!");
          res.sendStatus(200);
        });
      }
    }
  });
});

module.exports = router;
