import {
  Meteor
} from 'meteor/meteor';

import '../imports/api/collections/documents';
import '../imports/api/collections/sessions';
import '../imports/api/collections/test';
import '../imports/api/collections/chapitres';
import '../imports/api/collections/connexions';
import '../imports/api/collections/images';
import '../imports/api/collections/messages';

import '../imports/api/collections/publication';


import {
  Images
} from '../imports/api/collections/images'

import socket_io from 'socket.io';
import './timer'
import { Connexions } from '../imports/api/collections/connexions';
import { Documents } from '../imports/api/collections/documents';
import { Messages } from '../imports/api/collections/messages';


/**
 * Initialisation des socket côté serveur
 */
const PORT = 8080;
//Pas besoin d'initilaiser un serveur avec le module http en plus.
const io = socket_io(8080)

// New client
io.on('connection', function (socket) {
  console.log('new socket client');
});
Meteor.startup(() => {
  Connexions.remove({})
  Messages.remove({})
  Images.allow({
    'insert': function () {
      // add custom authentication code here
      return true;
    },
    'update': function () {
      return true;
    },
  });

  // console.log(process.env)

  // Meteor.publish('documents', () => {
  //   return Documents.find();
  // })
})


Meteor.methods({
  'message.client'(socketId, typeMessage, data) {
    io.to(`${socketId}`).emit(typeMessage, data)
  },

  'ejection.client'(id, socketId, online) {
    if (online) {
      io.sockets.connected[socketId].emit('logoutForce');
    }
    // Meteor.call('connexion.remove', id)
  },

  'notification'(infos) {
    console.log(infos)
    let { title, message, type } = infos;
    io.emit('notification', title, message, type)

  },

  'deconnexion.editeur'() {
    io.emit('logoutForce')
  },

  'getIp'() {
    return process.env.ROOT_URL
  }
})