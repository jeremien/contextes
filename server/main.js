import { Meteor } from 'meteor/meteor';

import fs from 'fs';
import Moment from 'moment';
import compressing from 'compressing';

import { getImagesInfos, getText } from './Archive';

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

// import { createSmallImage } from './processImages';


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

    if (!Meteor.isProduction) {

      /*
      * fabrication de l'archive local
      */

      const selection = Documents.find({
          chapitre: chapitre
      }, { sort: { ref : 1}} ).fetch();

      const images = getImagesInfos(selection);
      const data_json = JSON.stringify(selection);
      const text = getText(selection);
      const date = Moment().format('DD-MM-YY');

      const outDir = `${process.env.PWD}/public/export/`;

      try {
        if (!fs.existsSync(outDir)) {
          fs.mkdirSync(outDir);
        };
      } catch (error) {
        console.log(error);
      }

      try {
        if (images.length !== 0) {
          images.forEach((item) => {
            fs.copyFile(`${item.path}`, `${outDir}${item.name}`, (error) => {
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

      try {
        fs.writeFile(`${outDir}${date}-data.json`, data_json, (error) => {
          if (error) {
            console.log(error);
            return;
          };
        });
    
        fs.writeFile(`${outDir}${date}-data.txt`, text, (error) => {
          if (error) {
            console.log(error);
            return;
          };
        });
      } catch (error) {
        console.log(error);
      }

      compressing.tar.compressDir(`${process.env.PWD}/public/export`, `${process.env.PWD}/public/export.tar`)
        .then()
        .catch((error) => {
          if (error) {
            console.log(error);
          }
      });



    } else {


      /*
      * fabrication de l'archive serveur
      */

      const selection = Documents.find({
        chapitre: chapitre
      }, { sort: { ref : 1}} ).fetch();

      const images = getImagesInfos(selection);
      const data_json = JSON.stringify(selection);
      const text = getText(selection);
      const date = Moment().format('DD-MM-YY');
      const outDir = `/opt/contexte/current/bundle/programs/web.browser/app/export/`;

      try {
        if (!fs.existsSync(outDir)) {
          fs.mkdirSync(outDir);
        };
      } catch (error) {
        console.log(error);
      }

      try {
        if (images.length !== 0) {
          images.forEach((item) => {
            fs.copyFile(`${item.path}`, `${outDir}${item.name}`, (error) => {
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

      try {
        fs.writeFile(`${outDir}${date}-data.json`, data_json, (error) => {
          if (error) {
            console.log(error);
            return;
          };
        });
    
        fs.writeFile(`${outDir}${date}-data.txt`, text, (error) => {
          if (error) {
            console.log(error);
            return;
          };
        });
      } catch (error) {
        console.log(error);
      }

      compressing.tar.compressDir(`/opt/contexte/current/bundle/programs/web.browser/app/export`, `/opt/contexte/current/bundle/programs/web.browser/app/export.tar`)
      .then()
      .catch((error) => {
        if (error) {
          console.log(error);
        }
     });
      
    }

  },

  'image.remove'(id) {
    const doc = Documents.findOne(id);
    if (doc.image !== null) {
      Images.remove({ _id : doc.image });
    }
  }

});