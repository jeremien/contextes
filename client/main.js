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
  let socket = require('socket.io-client')(`http://192.168.5.129:${PORT}`);

  socket.on('connect', function () {
    // console.log('Client connected');
    render( <App socket={socket} /> , document.getElementById('root'))
  });
  socket.on('disconnect', function () {
    // console.log('Client disconnected');
  });
  socket.on('texte', function(data) {
    console.log(data)
  });

  // socket.on('notification', (message) => {
  //   console.log('notification', message);
  // });
  
});