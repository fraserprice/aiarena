const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user');

class Verification {
  static getCurrentUser(req, callback) {
    if (!req.headers.authorization) {
      return callback(true);
    }

    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        return callback(err);
      }

      const userID = decoded.sub;

      return User.findById(userID, (err, user) => {
        if (err || !user) {
          return callback(err, user);
        }

        return callback(err, user);
      });
    });
  };
}

module.exports = Verification;
