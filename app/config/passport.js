/**
 * Created by fraser on 06/06/2017.
 */

const passport = require('passport');
const user = require('../models/user');
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
    User.findOne({'email': req.payload.email}, (err, user) => {
        if(err) {
            return done(err);
        }
        if(user) {
            return done(null, false, {message: 'Email already in use'});
        }
    });
    User.findOne({'username': username}, (err, user) => {
        if(err) {
            return done(err);
        }
        if(user) {
            return done(null, false, {message: 'Name already in use; please select a different one'});
        }
    });
    const newUser = new User();
    newUser.username = username;
    newUser.password = newUser.encryptPassword(password);
    newUser.save((err, result) => {
        if(err) {
            return done(err);
        }
        return done(null);
    });
}));