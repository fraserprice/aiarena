'use strict'

class Socket {
  constructor(server) {
    this.io = require('socket.io')(server);
    this.io.on('connection', (socket) => {console.log("user connected");});
  }
}

module.exports = Socket;
