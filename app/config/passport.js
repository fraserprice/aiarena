const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const config = require('./config');
const Submission = require('../models/submission');
const Friend = require('../models/friend');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  })
});

passport.use('local.register', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, username, password, done) {
  User.findOne({ $or: [{'email': req.body.email}, {'username': username}]}, (err, user) => {
   if(err) {
     console.log("erred");
     return done(err);
   }
   if(user) {
     console.log("username in use - " + user.username);
     return done(null, false, {message: 'Email or username in use'});
   }

   const default_submission = new Submission();
   default_submission.name = "Chess ex.";
   default_submission.type = "Chess";
   default_submission.dbID = "5943a1f8e66845002762bdd1";

   const default_friend = new Friend();
   default_friend.name = "AI_Bot";
   default_friend.uid = "5943a3b8e2811500277f0a2d";
   default_friend.main = "5943a9c0e2811500277f0a2e";

   const newUser = new User();
   newUser.username = username;
   newUser.email = req.body.email;
   newUser.submissions = [default_submission];
   newUser.friends = [default_friend];
   newUser.mainSubmission = "5943a1f8e66845002762bdd1";
   newUser.encryptAndSetPassword(password, () => {
     newUser.save((err, data) => {
       if(err) {
         return done(err, false, {message: 'Error saving user!'});
       }

       return done(null, newUser, {message: 'Success'});
     });
   });
  });
}));

passport.use('local.login', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, (req, username, password, done) => {
  User.findOne({'username': username}, (err, user) => {
    if(err) {
      return done(err);
    }
    console.log("logging in...");
    if(!user) {
      console.log("not found");
      return done(null, false, {message: 'Username not found'})
    }

    user.validPassword(password, (err, match) => {
      if (err) {
        console.log(err);
        return done(null, false, {message: "Error!"});
      }

      if (match) {
        const payload = {
          sub: user._id
        };

        const data = user;

        const token = jwt.sign(payload, config.jwtSecret);
        console.log("token created: " + token);
        return done(null, token, data);
      } else {
        console.log("pass invalid");
        return done(null, false, {message: 'Wrong password'});
      }
    });
  });
}));
