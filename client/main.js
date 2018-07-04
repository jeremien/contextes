import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import React from 'react';

import './main.html';
import {Commentaires} from '../imports/api/collections/commentaires';
import { Sessions } from '../imports/api/collections/sessions';
import { Test } from '../imports/api/collections/test';
import TestAPi from '../imports/ui/components/TestAPI';
import App from '../imports/ui/components/App';

/**
 * Debut du programme
 */
Meteor.startup(() => {
  render(<App />, document.getElementById('root'))
});