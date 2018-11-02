import {
    Mongo
} from 'meteor/mongo';
import {
    Meteor
} from 'meteor/meteor';
import {
    check
} from 'meteor/check';
import {
    Documents
} from './documents';

export const Messages = new Mongo.Collection('messages');
// Chapitres.attachCollectionRevisions(CollectionRevisions.Chapitres);

if (Meteor.isServer) {
    Meteor.publish('messages', function messagesPublication() {
        return Messages.find();
    })
}

Meteor.methods({
    /**
     * @param {*} auteur Personne qui a créer le chapitre par défaut
     * @param {*} message Contenu du message envoyé
     */
    'messages.insert'(auteur, message) {
        Messages.insert({            
            auteur: auteur,
            message: message,
            creation: new Date()
        });
    },
})