'use strict'

var io;
var clients = [];

function init(server) {
  io = require('socket.io')(server);
  io.on('connection', connectUser);
}

function connectUser(socket) {
  console.log("userID: " + socket.id + " connected");
  clients.push(socket);
}

function pushToClient(clientID, eventType, data) {
  for (var i = 0; i < clients.length; i++) {
    if (clients[i].id == clientID) {
      var socket = clients[i];
      console.log("pushing message: " + data + ", to clientID: " + clientID);
      socket.emit(eventType, data);
      break;
    }
  }
}

module.exports = { init, pushToClient }
