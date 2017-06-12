const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');
const config = require('./config');

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
   const newUser = new User();
   newUser.username = username;
   newUser.email = req.body.email;
   newUser.encryptAndSetPassword(password, () => {
     newUser.save((err, data) => {
       if(err) {
         return done(err);
       }
       return done(null, newUser);
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
