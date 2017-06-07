const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const passport = require('passport');

router.post('/', passport.authenticate('local.register'));

module.exports = router;