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