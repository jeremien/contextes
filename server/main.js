import { Meteor } from 'meteor/meteor';

import fs from 'fs';
import Moment from 'moment';
import compressing from 'compressing';

import { getImagesPath, getText } from '../imports/components/utils/Archive';

import '../imports/api/collections/documents';
import '../imports/api/collections/sessions';
import '../imports/api/collections/chapitres';
import '../imports/api/collections/connexions';
import '../imports/api/collections/images';
import '../imports/api/collections/messages';
import '../lib/images'

import { Images } from '../imports/api/collections/images'
import { Connexions } from '../imports/api/collections/connexions';
import { Documents } from '../imports/api/collections/documents';
import { Messages } from '../imports/api/collections/messages';

import { createSmallImage } from './processImages';


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
  // Images.load('https://raw.githubusercontent.com/VeliovGroup/Meteor-Files/master/logo.png', {
  //   fileName: 'logo.png',
  //   fileId: 'abc123myId', //optional
  //   meta: {}
  // });

  JsonRoutes.setResponseHeaders({
    "Cache-Control": "no-store",
    "Pragma": "no-cache",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
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
  },

  'chapitres.export'(chapitre) {

    const selection = Documents.find({
        chapitre: chapitre
    }, { sort: { creation : -1}} ).fetch();

    const data = JSON.stringify(selection);

    const images = getImagesPath(selection);
    const text = getText(selection);

    const date = Moment().format('DD-MM-YY');
    const dir = Meteor.isProduction ? '/opt/contexte/current/bundle/programs/web.browser/app/' : `${process.env.PWD}/public/${date}/`;
    const imageDir = Meteor.isProduction ? '/opt/contexte/current/bundle/assets/' : `${process.env.PWD}/assets/`;

    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      };
    } catch (error) {
      console.log(error);
    }

    try {
      if (images.length !== 0) {
        images.forEach((item) => {
          fs.copyFile(`${imageDir}${item}`, `${dir}${item}`, (error) => {
            if (error) {
              console.log(error);
              return;
            }
          });
        });
      }
    } catch (error) {
      console.log(error);
    }


    if (!Meteor.isProduction) {
      fs.writeFile(`${process.env.PWD}/public/${date}/data.json`, data, (error) => {
        if (error) {
          console.log(error);
          return;
        };
      });
  
      fs.writeFile(`${process.env.PWD}/public/${date}/data.txt`, text, (error) => {
        if (error) {
          console.log(error);
          return;
        };
      });
    
      compressing.tar.compressDir(`${process.env.PWD}/public/${date}`, `${process.env.PWD}/public/${date}.tar`)
        .then().catch();

    } else {

      fs.writeFile(`/opt/contexte/current/bundle/programs/web.browser/app/${date}/data.json`, data, (error) => {
        if (error) {
          console.log(error);
          return;
        };
      });
  
      fs.writeFile(`/opt/contexte/current/bundle/programs/web.browser/app/${date}/data.txt`, text, (error) => {
        if (error) {
          console.log(error);
          return;
        };
      });
    
      compressing.tar.compressDir(`/opt/contexte/current/bundle/programs/web.browser/app/${date}`, `/opt/contexte/current/bundle/programs/web.browser/app/${date}.tar`)
        .then().catch();
    }
   

    if (!Meteor.isProduction) {
      Meteor.call('chapitres.archive', chapitre, `${process.env.ROOT_URL}${date}.tar`);
      return `${process.env.ROOT_URL}${date}.tar`;
    } else {
      Meteor.call('chapitres.archive', chapitre, `${process.env.ROOT_URL}/${date}.tar`);
      return `${process.env.ROOT_URL}/${date}.tar`;
    }

  },

  'image.remove'(id) {
    const doc = Documents.findOne(id);
    if (doc.image !== null) {
      Images.remove({ _id : doc.image });
    }
  }

});