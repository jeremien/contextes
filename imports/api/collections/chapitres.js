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

export const Chapitres = new Mongo.Collection('chapitres');
// Chapitres.attachCollectionRevisions(CollectionRevisions.Chapitres);

if (Meteor.isServer) {
    // Meteor.publish('chapitres', function chapitresPublication() {
    //     return Chapitres.find();
    // })

    Meteor.publish('chapitres', function (session) {
        if (Roles.userIsInRole(this.userId, "admis", session.session)) {
            return Chapitres.find({ session: session.session })
        }
        else {
            return Chapitres.find({ fields: { _id: 0 } });
        }
    });
}

Meteor.methods({
    /**
     * @param {string} session Identifiant de la session parente
     * @param {*} titre Titre du chapitre
     * @param {*} auteur Personne qui a créer le chapitre par défaut
     * @param {integer} duree Durée du chapitre en minutes
     */
    'chapitres.insert'(session, titre, auteur, description, duree, tags) {
        Chapitres.insert({
            session: session,
            titre: titre,
            auteur: auteur,
            description,
            description,
            creation: new Date(),
            /**
             * Etats possibles : 
             * edition (par défaut), prepresse, archivee
             */
            etat: 'edition',
            isOpen: true,
            utilisateurs_connectes: [],
            timer: duree,
            id_timer: null,
            duree_boucle: duree,
            tags: tags,
        });
    },

    'chapitres.remove'(idSuppression) {
        Meteor.call('documents.remove', idSuppression)
        Chapitres.remove({
            $or: [{
                _id: idSuppression
            }, {
                session: idSuppression
            }]
        })
    },

    'chapitres.update'(chapitreId, titre) {
        Chapitres.update(chapitreId, {
            $set: {
                titre: titre
            }
        });
    },

    'chapitres.isOpen'(chapitreId, isOpen) {
        Chapitres.update(chapitreId, {
            $set: {
                isOpen: !isOpen
            }
        });
    },

    'chapitres.getVersion'(chapitreId) {
        return Chapitres.findOne(chapitreId).revisions.length
    },

    'chapitres.getAllCommentaires'(chapitre) {
        Meteor.subscribe('documents')
        return Documents.find({
            chapitre: chapitre
        })
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

    'chapitres.timer.update'(chapitreId, dureeBoucle) {
        const newTimer = (Chapitres.findOne({
            _id: chapitreId
        }).timer) - 1
        if (newTimer == 0) {
            Chapitres.update({
                _id: chapitreId
            }, {
                    $set: {
                        timer: dureeBoucle,
                    }
                })
            Meteor.call('timer.next')
        } else {
            Chapitres.update({
                _id: chapitreId
            }, {
                    $set: {
                        timer: newTimer
                    }
                })
        }

    },

    'chapitres.timer.reset'(chapitreId, debut) {
        Chapitres.update({
            _id: chapitreId
        }, {
                $set: {
                    timer: debut,
                    id_timer: null
                }
            })
    },

    'chapitres.timer.set'(chapitreId, timerId) {
        Chapitres.update({
            _id: chapitreId
        }, {
                $set: {
                    id_timer: timerId
                }
            })
    },

    'chapitres.timer.duree'(chapitreId, duree) {
        Chapitres.update({
            _id: chapitreId
        }, {
                $set: {
                    duree_boucle: duree
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
    }
})