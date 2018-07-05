import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Commentaires } from './commentaires';

export const Chapitres = new Mongo.Collection('chapitres');
Chapitres.attachCollectionRevisions();

if (Meteor.isServer) {
    Meteor.publish('chapitres', function chapitresPublication(){
        return Chapitres.find();
    })
}

Meteor.methods({
    /**
     * @param {string} session Identifiant de la session parente
     * @param {*} titre Titre du chapitre
     * @param {*} auteur Personne qui a créer le chapitre par défaut
     */
    'chapitres.insert'(session, titre, auteur) {
        Chapitres.insert({
            session: session,
            titre: titre,
            auteur: auteur,
            creation: new Date(),
            edition : true,
            archive: false,
            utilisateurs_connectes: [],
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

    'chapitres.getAllCommentaires'(chapitre) {
        Meteor.subscribe('commentaires')
        return Commentaires.find({chapitre: chapitre})
    },

    'chapitres.connexion'(chapitreId, utilisateur) {
        Chapitres.update({_id: chapitreId}, {$addToSet: {utilisateurs_connectes: utilisateur}})
    },

    'chapitres.deconnexion'(chapitreId, utilisateur) {
        Chapitres.update({_id: chapitreId}, {$pull: {utilisateurs_connectes: utilisateur}})
    },
})