import {
  Meteor
} from 'meteor/meteor';
import {
  Session
} from 'meteor/session';

// import './timer'

import '../imports/api/collections/documents';
import '../imports/api/collections/sessions';
import '../imports/api/collections/test';
import '../imports/api/collections/chapitres';
import '../imports/api/collections/connexions';

// import http from 'http';
import socket_io from 'socket.io';


const PORT = 8080;
//Pas besoin d'initilaiser un serveur avec le module http en plus.
const io = socket_io(8080)


let counter = 0;

// New clientcmfh
io.on('connection', function (socket) {
  console.log('new socket client');
});

Meteor.methods ({
  'message.client'(socketId) {
    // io.sockets.socket(socketId).emit('message', 'un message')
    // io.socket.broadcast.emit('texte', "test message");
    // io.sockets.connected[socketId].emit('texte', "test message");
    // io.socket.to(socketId).emit('texte', "test message");
    io.emit('logout'); // emit an event to all connected sockets
  },

  'deconnexion.editeur'() {
    io.emit('logoutForce')
  }
})