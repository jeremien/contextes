import {
  Meteor
} from 'meteor/meteor';
import {
  render
} from 'react-dom';
import React from 'react';

import './main.html';
import App from '../imports/ui/components/App';

/**
 * Debut du programme
 */
Meteor.startup(() => {
  render( < App /> , document.getElementById('root'))
});