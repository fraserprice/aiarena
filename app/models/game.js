const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const gameSchema = new Schema({
  id: {type: Number, required: true},
  game: {type: String, required: true},
  playerOne: {username: String, code: String, clientID: String},
  playerTwo: {username: String, code: String, clientID: String},
  inProgress: {type: Boolean, required: true},
  winner: String
});

module.exports = mongoose.model('Game', gameSchema);
