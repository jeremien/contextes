import {
  Meteor
} from 'meteor/meteor';
import {
  Session
} from 'meteor/session';


import '../imports/api/collections/documents';
import '../imports/api/collections/sessions';
import '../imports/api/collections/test';
import '../imports/api/collections/chapitres';
import '../imports/api/collections/connexions';

// import http from 'http';
import socket_io from 'socket.io';


const PORT = 8080;

Meteor.startup(() => {
  //Pas besoin d'initilaiser un serveur avec le module http en plus.
  const io = socket_io(8080)


  let counter = 0;

  // New client
  io.on('connection', function (socket) {
    console.log('new socket client');
  });
});