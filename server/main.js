import {
  Meteor
} from 'meteor/meteor';

import '../imports/api/collections/documents';
import '../imports/api/collections/sessions';
import '../imports/api/collections/chapitres';
import '../imports/api/collections/connexions';
import '../imports/api/collections/images';
import '../imports/api/collections/messages';
import '../lib/images'


import {
  Images
} from '../imports/api/collections/images'
import {
  Connexions
} from '../imports/api/collections/connexions';
import {
  Documents
} from '../imports/api/collections/documents';
import {
  Messages
} from '../imports/api/collections/messages';


Streamy.onConnect(function (socket) {

});

Meteor.startup(() => {
  // Connexions.remove({});
  Messages.remove({});
  Images.allow({
    'insert': function () {
      // add custom authentication code here
      return true;
    },
    'update': function () {
      return true;
    },
  });
  Images.load('https://raw.githubusercontent.com/VeliovGroup/Meteor-Files/master/logo.png', {
    fileName: 'logo.png',
    fileId: 'abc123myId', //optional
    meta: {}
  });

  // console.log(process.env)

  // Meteor.publish('documents', () => {
  //   return Documents.find();
  // })
  // JsonRoutes.setResponseHeaders({
  //   "Cache-Control": "no-store",
  //   "Pragma": "no-cache",
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
  //   "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
  // });

  // Listen to incoming HTTP requests, can only be used on the server
  WebApp.rawConnectHandlers.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return next();
  });

})


Meteor.methods({
  'message.client'(socketId, typeMessage, data) {
    Streamy.emit(typeMessage, data, Streamy.sockets(socketId));
  },

  'ejection.client'(id, socketId, online) {
    if (online) {
      Streamy.emit('logoutForce', {}, socketId);
    }
    // Meteor.call('connexion.remove', id)
  },

  'notification'(infos) {
    Streamy.broadcast('notification', infos);
  },

  'deconnexion.editeur'() {
    Streamy.broadcast('logoutForce')
  },

  'getIp'() {
    return process.env.IP || '127.0.0.1'
  },

  'reset'(type) {

    switch (type) {
      case 'message':
        Messages.remove({});
        break;
      
      default:
        console.log('no type')
    }
      
    console.log(type)
  }
})