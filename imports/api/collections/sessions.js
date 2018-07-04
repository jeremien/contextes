import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Chapitres } from './chapitres';

export const Sessions = new Mongo.Collection('sessions');
Sessions.attachCollectionRevisions();

if (Meteor.isServer) {
    Meteor.publish('sessions', function sessionsPublication(){
        return Sessions.find();
    })
}

Meteor.methods({
    /**
     * Permet de créer une nouvelle session.
     * L'éditeur par défaut sera l'utilisateur connecté qui demande la création de la session.
     * @param {string} titre - Le titre de la session
     * @param {objet} auteur - Contient le l'id et le nom du créateur de la session sous la forme {auteurId: ObjetId, auteurNom: string}.
     */
    'sessions.insert'(titre, auteur) {
        Sessions.insert({
            titre: titre,
            auteur: auteur,
            creation: new Date(),
            edition: false,
            archive: false,
            utilisateurs_connectes: [],

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
    /**
     * Retourne tous les chapitres appartenant à la session sessionId.
     * @param {OdbjectId} sessionId - Identifiant de la session
     */
    'session.getAllChapitres'(session) {
        return Chapitres.find({session: session});
    },

    'sessions.connexion'(sessionId, utilisateur) {
        Session.update(sessionId, {$add})
    },

    'sessions.deconnexion'(sessionId, utilisateur) {

    },

    // 'sessions.getEditionEnCours'(session) {
    //     return Chapitres.find({session: session}, {_id: 0, titre: 1, utilisateurs_connectes: 1})
    // },
})