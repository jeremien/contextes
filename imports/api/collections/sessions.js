import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Chapitres } from './chapitres';

export const Sessions = new Mongo.Collection('sessions');
Sessions.attachCollectionRevisions();

if (Meteor.isServer) {
    Meteor.publish('sessions', function sessionsPublication() {
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
    'sessions.insert'(titre, auteur, description, password) {

        if (password === '') {
            password = 'test';
        }

        Sessions.insert({
            titre,
            auteur,
            creation: new Date(),
            description,
            etat: "edition",
            utilisateurs_connectes: [],
            utilisateurs_ayant_participe: [],
            password,
        });
    },

    'sessions.remove'(sessionId) {
        Meteor.call('documents.remove', sessionId, false)
        Meteor.call('chapitres.remove', sessionId)
        Sessions.remove({
            _id: sessionId
        })
    },

    'sessions.update'(sessionId, titre) {
        Sessions.update(sessionId, {
            $inc: {
                version: 1
            },
            $set: {
                titre: titre
            }
        });
    },

    'sessions.update.index'(sessionId, infos) {
        Sessions.update(sessionId, {
            $set: {
                titre : infos.titre,
                description : infos.description,
                auteur : infos.auteur
            }
        })
    },

    'sessions.getVersion'(sessionId) {
        return Sessions.findOne(sessionId).revisions.length
    },
    /**
     * Retourne tous les chapitres appartenant à la session sessionId.
     * @param {OdbjectId} sessionId - Identifiant de la session
     */
    'session.getAllChapitres'(session) {
        return Chapitres.find({
            session: session
        });
    },

    'sessions.deconnexion'(sessionId, utilisateur) {

    },

    'sessions.etat.update'(sessionId, etat) {
        Sessions.update({ _id: sessionId }, { $set: { etat: etat } });
        Meteor.call('chapitres.etat.update', sessionId, etat)
    },

    'sessions.connexion'(userId, session, password) {
        if (password == Sessions.findOne({ _id: session }).password) {
            Roles.addUsersToRoles(userId, "admis", session);
            return true;
        }
        else {
            return false;
        }
    },

    'sessions.getTitre'(sessionId) {
        let session = Sessions.findOne(sessionId).titre

        if (session) {
            return session
        }
    },

})