const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const codeSchema = new Schema({
  user: {type: String, required: true},
  code: {type: String, required: true},
});

module.exports = mongoose.model('Code', codeSchema);
