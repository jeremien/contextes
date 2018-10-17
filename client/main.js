import {
  Meteor
} from 'meteor/meteor';
import {
  render
} from 'react-dom';
import React from 'react';
import i18n from 'meteor/universe:i18n'

import './main.html';
import App from '../imports/components/App';
// import TestAPI from '../imports/components/ui/TestAPITestAPI'
/**
 * Debut du programme
 */
Meteor.startup(() => {
      // Socket io client
      const PORT = 8080;

      var socket;
      Meteor.call("getIp", function (error, result) {
          if (error) {
            console.log(error.reason);
            return;
          } else {
            console.log(result)
            if (result == "http://localhost:3000/") {
              socket = require('socket.io-client')(`http://127.0.0.1:${PORT}`);
            } else {
              socket = require('socket.io-client')(`${result}:${PORT}`);
            }

            socket.on('connect', function () {
                console.log('Client connected');
                render( < App socket = {
                    socket
                  }
                  />, document.getElementById('root'))
                }); socket.on('disconnect', function () {
                // console.log('Client disconnected');
              }); socket.on('texte', function (data) {
                console.log(data)
              });
            }
          }

        )


        // socket.on('notification', (message) => {
        //   console.log('notification', message);
        // });

      });