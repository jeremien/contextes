import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Test = new Mongo.Collection('test')
Test.attachCollectionRevisions();


