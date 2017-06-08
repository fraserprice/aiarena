const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

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
        newUser.password = newUser.encryptPassword(password);
        newUser.save((err, data) => {
          if(err) {
            return done(err);
          }
          return done(null, newUser);
        });
    });
}));

passport.use('local.login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, username, password, done) {
    User.findOne({'username': username}, (err, user) => {
      if(err) {
          return done(err);
      }
      console.log("logging in...");
      if(!user) {
        console.log("not found");
        return done(null, false, {message: 'Username not found'})
      } else if(!user.validPassword(password)) {
        console.log("Invalid pass");
        return done(null, false, {message: 'Wrong password'})
      } else {
        console.log("user found");
      }

      return done(null, user);
    })
}));
