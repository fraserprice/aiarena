const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  pendingFriendRequests: [String],
  friends: [String],
  pendingChallenges: [{date: Date, friend: String, game: String}],
  currentGame: {active: Boolean, id: Number}
});

userSchema.methods.encryptAndSetPassword = function(password, callback) {
  bcrypt.hash(password, null, null, (err, hash) => {
    if(err) {
      return callback();
    }
    this.password = hash;
    return callback();
  });
};

userSchema.methods.validPassword = function(password, callback) {
  bcrypt.compare(password, this.password, (err, match) => {
      callback(err, match);
  });
};

module.exports = mongoose.model('User', userSchema);
