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

Meteor.startup(() => {
  render(<App />, document.getElementById('root'))
});

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
    // Meteor.call('commentaires.insert', "session 1", "un commentaire", "arthur");
    // const comm = Commentaires.findOne();
    // console.log(comm);
    // Meteor.call('commentaires.update', Commentaires.findOne()._id, "un commentaire mis à jour", 12)
    // console.log(Meteor.call('commentaires.insert', "session 1", "chapitre 1", "un commentaire", "arthur"));
    
    // Test.insert({v: "rev 0"})
    Test.update(Test.findOne()._id, {$set: {v: "rev 3"}})
    // CollectionRevisions.restore('test', "5b2ce38af75479a335c49b94", revision);

    console.log(Test.findOne().revisions.length);
  },
});
