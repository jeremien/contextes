import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Chapitres = new Mongo.Collection('chapitres');
Chapitres.attachCollectionRevisions();

if (Meteor.isServer) {
    Meteor.publish('chapitres', function chapitresPublication(){
        return Chapitres.find();
    })
}

Meteor.methods({
    'chapitres.insert'(session, titre, auteur) {
        Chapitres.insert({
            session: session,
            titre: titre,
            auteur: auteur,
            ouvertA: new Date(),
        });
    },

    'chapitres.remove'(chapitreId){
        const chapitre = Chapitres.findOne(chapitreId)
        /**
         * Définir ce qu'est une supression de chapitre
         */
        // Chapitres.update(chapitreId, {$set: })
    },

    'chapitres.update'(chapitreId, titre){
        Chapitres.update(chapitreId, {$set: {titre: titre}});
    },

    'chapitres.getVersion'(chapitreId) {
        return Chapitres.findOne(chapitreId).revisions.length
    },

    // 'chapitres.ajouterCommentaire'
})