import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Commentaires } from './documents';

export const Chapitres = new Mongo.Collection('chapitres');
// Chapitres.attachCollectionRevisions(CollectionRevisions.Chapitres);

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
     * @param {integer} duree Durée du chapitre en minutes
     */
    'chapitres.insert'(session, titre, auteur, description, duree) {
        Chapitres.insert({
            session: session,
            titre: titre,
            auteur: auteur,
            description, description,
            creation: new Date(),
            edition : false,
            archive: false,
            utilisateurs_connectes: [],
            timer: 0,
            duree_chapitre: duree,
        });
    },

    'chapitres.remove'(idSuppression){
        Meteor.call('documents.remove', idSuppression)
        Chapitres.remove({$or: [{_id: idSuppression}, {session: idSuppression}]})
    },

    'chapitres.update'(chapitreId, titre){
        Chapitres.update(chapitreId, {$set: {titre: titre}});
    },

    'chapitres.getVersion'(chapitreId) {
        return Chapitres.findOne(chapitreId).revisions.length
    },

    'chapitres.getAllCommentaires'(chapitre) {
        Meteor.subscribe('documents')
        return Commentaires.find({chapitre: chapitre})
    },

    'chapitres.connexion'(chapitreId, utilisateur) {
        Chapitres.update({_id: chapitreId}, {$addToSet: {utilisateurs_connectes: utilisateur}})
    },

    'chapitres.deconnexion'(chapitreId, utilisateur) {
        Chapitres.update({_id: chapitreId}, {$pull: {utilisateurs_connectes: utilisateur}})
    },

    'chapitres.timer.update'(chapitreId, longueurTimer) {
        newTimer = (Chapitres.findOne({_id: chapitreId}).timer + 1) % longueurTimer; 
        Chapitres.update({_id: chapitreId}, {$set: {timer: newTimer}})
    },

    'chapitres.timer.reset'(chapitreId) {
        Chapitres.update({_id: chapitreId}, {$set: {timer: 0}})
    }

    // 'chapitres.pause'(chapitreId){
    //     Chapitres.update({_id: chapitreId}, {$set: {edition : false}})
    // },
})