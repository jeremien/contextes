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
import '../imports/api/collections/logs';
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
import {
  Logs
} from '../imports/api/collections/logs';

Streamy.onConnect(function (socket) {

});

Meteor.startup(() => {
  // Connexions.remove({});
  Logs.remove({});
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
    return process.env.ROOT_URL
  }
})