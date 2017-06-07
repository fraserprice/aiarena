const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.serializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
});

passport.use('local.register', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => {
    User.findOne({ $or: [{'email': req.body.email}, {'username': username}]}, (err, user) => {
        if(err || user) {
            return done(err);
        }
        if(user) {
            return done(null, false, {message: 'Email or username already in use'});
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