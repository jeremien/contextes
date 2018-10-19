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
          } 
          else {
            if (result == "http://localhost:3000/") {
              socket = require('socket.io-client')(`http://127.0.0.1:${PORT}`);
            } 
            else {
              let ip = result.slice(0, -5);
              console.log(ip)
              socket = require('socket.io-client')(`${ip}:${PORT}`);
            }

            socket.on('connect', function () {
                render( < App socket = {
                    socket
                  }
                  />, document.getElementById('root'))
                }); 
            socket.on('disconnect', function () {

              }); 
            socket.on('texte', function (data) {
                console.log(data)
              });
            }
          }
        )
      });