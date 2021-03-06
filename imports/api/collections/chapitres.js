import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import {
    Documents
} from './documents';

export const Chapitres = new Mongo.Collection('chapitres');
// Chapitres.attachCollectionRevisions(CollectionRevisions.Chapitres);

if (Meteor.isServer) {

    Meteor.publish('chapitres', function chapitresPublication() {
        return Chapitres.find()
    })

    //TODO: probleme avec simple rest > session undefined
    // Meteor.publish('chapitres', function (session) {
    //     console.log(session)
    //     if (Roles.userIsInRole(this.userId, "admis", session.session)) {
    //         // console.log('admis')
    //         return Chapitres.find({ session: session.session })
    //     }
    //     else {
    //         // console.log('non admis')
    //         return Chapitres.find({ fields: { _id: 0 } });
    //     }
    //     // return Chapitres.find({ session: session.session })
    // });
}

Meteor.methods({
    /**
     * @param {string} session Identifiant de la session parente
     * @param {*} titre Titre du chapitre
     * @param {*} auteur Personne qui a créer le chapitre par défaut
     * @param {integer} duree Durée du chapitre en minutes
     */
    'chapitres.insert'(session, titre, auteur, description) {

        Chapitres.insert({
            session,
            titre,
            auteur,
            description,
            creation: new Date(),
            /**
             * Etats possibles : 
             * edition (par défaut), prepresse, archivee
             */
            etat: 'edition',
            isOpen: true,
            utilisateurs_connectes: [],
            archive: null
        });
    },

    'chapitres.remove'(idSuppression) {
        Meteor.call('documents.remove', idSuppression, false)
        Chapitres.remove({
            $or: [{
                _id: idSuppression
            }, {
                session: idSuppression
            }]
        })
    },

    'chapitres.update'(chapitreId, infos) {
        Chapitres.update(chapitreId, {
            $set: {
                titre: infos.titre,
                description : infos.description,
                auteur : infos.auteur,
                isOpen : infos.isOpen
            }
        });
    },

    'chapitres.isOpen'(chapitreId, isOpen) {
        Chapitres.update(chapitreId, {
            $set: {
                isOpen: !isOpen
            }
        });
        return isOpen;
    },

    'chapitres.getVersion'(chapitreId) {
        return Chapitres.findOne(chapitreId).revisions.length;
    },

    'chapitres.getTitre'(chapitreId) {
        let chapitre = Chapitres.findOne(chapitreId);
        if (chapitre) {
            return chapitre.titre
        }

    },

    'chapitres.getAllCommentaires'(chapitre) {
        Meteor.subscribe('documents')
        return Documents.find({
            chapitre: chapitre
        });
    },

    'chapitres.connexion'(chapitreId, utilisateur) {
        Chapitres.update({
            _id: chapitreId
        }, {
                $addToSet: {
                    utilisateurs_connectes: utilisateur
                }
            })
    },

    'chapitres.deconnexion'(chapitreId, utilisateur) {
        Chapitres.update({
            _id: chapitreId
        }, {
                $pull: {
                    utilisateurs_connectes: utilisateur
                }
            })
    },

    'chapitres.etat.update'(sessionId, etat) {
        Chapitres.update({
            session: sessionId
        }, {
                $set: {
                    etat: etat
                }
            });
    },

    'chapitres.nombre.badge'() {
        const pipeline = {
            $group: {
                _id: "$session",
                sum: {
                    $sum: 1
                }
            }
        }
        if (Meteor.isServer) {
            return Promise.await(Chapitres.rawCollection().aggregate(pipeline, {
                allowDiskUse: true
            }).toArray());
        }
    },

});