const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');

router.get('/register', passport.authenticate('local.register', {
    //TODO
}));

module.exports = router;