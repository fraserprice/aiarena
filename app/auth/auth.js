const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/user');

module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    console.log("Error: unauthorized");
    return res.status(401).end();
  }

  const token = req.headers.authorization.split(' ')[1];

  return jwt.verify(token, config.jwtSecret, (err, decoded) => {
    console.log("Error: unauthorized");
    if (err) { return res.status(401).end(); }

    const userID = decoded.sub;

    return User.findById(userID, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).end();
      }

      return next();
    });
  });
};
