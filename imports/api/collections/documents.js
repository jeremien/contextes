import {
    Mongo
} from 'meteor/mongo';
import {
    Meteor
} from 'meteor/meteor';
import {
    check
} from 'meteor/check';

export const Documents = new Mongo.Collection('documents');
/**
 * Effectue une sauvegarde à chaque modification. 
 * Les différentes version sont stockées par ordre chronologique dans une array accessible depuis le champs révision.
 */
Documents.attachCollectionRevisions();

if (Meteor.isServer) {
    Documents.attachCollectionRevisions();
    Meteor.publish('documents', function documentsPublication() {
        return Documents.find();
    });
}

Meteor.methods({
    /**
     * 
     * @param {object} session Session parente sous la forme {sessionId: ObjetId, sessionTitre: String}
     * @param {object} chapitre Chapitre parent sous la forme {chapitreId: ObjectId, chapitreTitre: String} 
     * @param {string} contenu Contenu du document 
     * @param {object} auteur Auteur du document sous la forme {auteurId: ObjetId, auteurNom: string}.
     * Le champ type peut être texte, image, note manuscrite, etc. Un type null correspond à un document supprimé
     */
    'documents.insert'(session, chapitre, contenu, auteur) {
        Documents.insert({
            session: session,
            chapitre: chapitre,
            contenu: contenu,
            auteur: auteur,
            creation: new Date(),
            correction: false,
            conformation: false,
            rejete: false,
            type: "texte",
            dernireModificationPar: auteur,
            image: null,
        });
    },

    /**
     * Permet de "supprimer un document" en le modifiant. Le contenu est vider et les métadatas sont conservées.
     * La version précédente est sauvagardée automatiquement dans le champs revisions.
     * @param {ObjectId} documentId Identifiant Mongo du document à supprimer
     */
    'documents.remove'(idSuppression) {
        Documents.remove({
            $or: [{
                _id: idSuppression
            }, {
                session: idSuppression
            }, {
                chapitre: idSuppression
            }]
        })
    },
    /**
     * La sauvegarde de la version précédente est faire grâce au module todda00:collection-revisions
     * @param {*} documentId 
     * @param {*} contenu 
     */
    'documents.update'(documentId, contenu, utilisateur) {
        Documents.update(documentId, {
            $set: {
                contenu: contenu,
                dernireModificationPar: utilisateur,
                correction: true
            }
        });
    },

    'documents.rejet'(documentId) {
        Documents.update(documentId, {
            $set: {
                rejete: true
            }
        });
    },

    'documents.accepte'(documentId) {
        Documents.update(documentId, {
            $set: {
                rejete: false
            }
        });
    },

    'commenrtaires.getVersion'(documentId) {
        return Documents.findOne(documentId).revisions.length
    },

    'documents.addImage'(session, chapitre, auteur, image) {
        Documents.insert({
            session: session,
            chapitre: chapitre,
            contenu: null,
            auteur: auteur,
            creation: new Date(),
            correction: false,
            conformation: false,
            rejete: false,
            type: "image",
            dernireModificationPar: auteur,
            image: image,
        });
    },

    'documents.updateImage'(document, image) {
        Documents.update({
            _id: document,
        }, {
            $set: {
                image: image,
            }
        });
    },

    'documents.nombre.badge'() {
        const pipeline = {
            $group: {
                _id: "$chapitre",
                sum: {
                    $sum: 1
                }
            }
        }
        if (Meteor.isServer) {
            return Promise.await(Documents.rawCollection().aggregate(pipeline, {
                allowDiskUse: true
            }).toArray());
        }
    }


})