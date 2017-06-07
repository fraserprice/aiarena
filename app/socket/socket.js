'use strict'

var io;

function init(server) {
  io = require('socket.io')(server);
  io.on('connection', (socket) => {console.log("user connected");});
}

module.exports = init;
