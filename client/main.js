import {
  Meteor
} from 'meteor/meteor';
import {
  render
} from 'react-dom';
import React from 'react';
import i18n from 'meteor/universe:i18n'

import './main.html';
import App from '../imports/ui/components/App';
/**
 * Debut du programme
 */
Meteor.startup(() => {
  render( < App /> , document.getElementById('root'))
});

// Socket io client
const PORT = 8080;
let socket = require('socket.io-client')(`http://localhost:${PORT}`);

socket.on('connect', function() {
  console.log('Client connected');
});
socket.on('disconnect', function() {
  console.log('Client disconnected');
});