const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},

});

userSchema.methods.encryptPassword = function() {
    return bcrypt.hashSync(this.password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(this.password, password);
};

module.exports = mongoose.model('User', userSchema);