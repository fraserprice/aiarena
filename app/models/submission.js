const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const submissionSchema = new Schema({
  name: {type: String, required: true},
  type: {type: String, required: true},
  dbID: {type: String, required: true} //Dirty hack
});

module.exports = mongoose.model('Submission', submissionSchema);
