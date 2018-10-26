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
import {
  consolidateStreamedStyles
} from 'styled-components';

// import TestAPI from '../imports/components/ui/TestAPITestAPI'

/**
 * Debut du programme
 */
Meteor.startup(() => {
      
      // Socket io client
      const PORT = 8080;
      console.log(self.location.host)
      var socket;
      Meteor.call("getIp", function (error, result) {
          if (error) {
            console.log(error.reason);
            return;
          } else {
            if (result == "http://localhost:3000/") {
              socket = require('socket.io-client')(`http://127.0.0.1:${PORT}`);
            } else {
              socket = require('socket.io-client')(`${result}:${PORT}`);
            }

            socket.on('connect', function () {
                render( < App socket = {
                    socket
                  }
                  />, document.getElementById('root'))
                }); socket.on('disconnect', function () {

              }); socket.on('texte', function (data) {
                console.log(data)
              });
            }
          }

        )
      });

      Streamy.onConnect(function() {
        console.log('stramy')
      });