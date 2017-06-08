const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},

});

userSchema.methods.encryptAndSetPassword = function(password, callback) {
    bcrypt.hash(password, null, null, (err, hash) => {
        if(err) {
            return null;
        }
        this.password = hash;
        return callback();
    });
};

userSchema.methods.validPassword = function(password, callback) {
    bcrypt.compare(password, this.password, (err, match) => {
        return callback(err, match);
    });
};

module.exports = mongoose.model('User', userSchema);