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

  render( < App /> , document.getElementById('root'))
});

Streamy.onConnect(function () {
});

Streamy.on('texte', function (data) {
  console.log(data)
});
