import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Sessions = new Mongo.Collection('sessions');
Sessions.attachCollectionRevisions();

if (Meteor.isServer) {
    Meteor.publish('sessions', function sessionsPublication(){
        return Sessions.find();
    })
}

Meteor.methods({
    'sessions.insert'(titre, auteur) {
        Sessions.insert({
            titre: titre,
            auteur: auteur,
            ouvertA: new Date(),
        });
    },

    'sessions.remove'(sessionId){
        const session = Sessions.findOne(sessionId)
        /**
         * Définir ce qu'est une supression de session
         */
        // sessions.update(sessionId, {$set: })
    },

    'sessions.update'(sessionId, titre){
        const session = Sessions.findOne(sessionId);
        Sessions.update(sessionId, {$inc: {version: 1}, $set: {titre: titre}});
    },

    'sessions.getVersion'(sessionId) {
        return Sessions.findOne(sessionId).revisions.length
    },
})