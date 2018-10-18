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
    Chapitres
} from './chapitres';

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
    'sessions.insert' (titre, auteur, description, roles, categories) {
        Sessions.insert({
            titre: titre,
            auteur: auteur,
            creation: new Date(),
            description: description,
            /**
             * Etats possibles : 
             * edition (par défaut), prepresse, archivee
             */
            etat: "edition",
            roles: roles,
            utilisateurs_connectes: [],
            utilisateurs_ayant_participe: [],
            categories: categories,
        });
    },

    'sessions.remove' (sessionId) {
        Meteor.call('documents.remove', sessionId)
        Meteor.call('chapitres.remove', sessionId)
        Sessions.remove({
            _id: sessionId
        })
    },

    'sessions.update' (sessionId, titre) {
        Sessions.update(sessionId, {
            $inc: {
                version: 1
            },
            $set: {
                titre: titre
            }
        });
    },

    'sessions.getVersion' (sessionId) {
        return Sessions.findOne(sessionId).revisions.length
    },
    /**
     * Retourne tous les chapitres appartenant à la session sessionId.
     * @param {OdbjectId} sessionId - Identifiant de la session
     */
    'session.getAllChapitres' (session) {
        return Chapitres.find({
            session: session
        });
    },

    'sessions.connexion' (sessionId, utilisateur) {
        Session.update(sessionId, {
            $add
        })
    },

    'sessions.deconnexion' (sessionId, utilisateur) {

    },
    
    'sessions.etat.update'(sessionId, etat) {
        Sessions.update({_id: sessionId}, {$set: {etat: etat}});
        Meteor.call('chapitres.etat.update', sessionId, etat)
    },
    
})