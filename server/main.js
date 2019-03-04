import { Meteor } from 'meteor/meteor';

import fs from 'fs';
// import archiver from 'archiver';
import Moment from 'moment';

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
  JsonRoutes.setResponseHeaders({
    "Cache-Control": "no-store",
    "Pragma": "no-cache",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With"
  });

  // Listen to incoming HTTP requests, can only be used on the server
  // WebApp.rawConnectHandlers.use("/methods/documents.test.insert",function(req, res, next) {
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   return next();
  // });

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
  },

  'chapitres.export'(chapitre) {

    const selection = Documents.find({
        chapitre: chapitre
    }).fetch();

    const data = JSON.stringify(selection);

    const images = getImagesPath(selection);
    const text = getText(selection);

    const date = Moment().format('DD-MM-YY');
    const dir = `${process.env.PWD}/public/${date}`;
    const imageDir = `${process.env.PWD}/assets/`;

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
          fs.copyFile(`${imageDir}${item}`, `${dir}/${item}`, (error) => {
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

    //TODO: compresser le dossier et accéder via l'interface

    // const out = fs.createWriteStream(`${process.env.PWD}/public/${date}.zip`);
    // const archiver = archiver('zip', { 
    //   zlib : { level : 9 }
    // });

    // out.on()


  }
});