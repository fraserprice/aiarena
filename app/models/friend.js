const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const friendSchema = new Schema({
  name: {type: String, required: true},
  uid: {type: String, required: true},
  main: {type: String, required: true}
});

module.exports = mongoose.model('Friend', friendSchema);
