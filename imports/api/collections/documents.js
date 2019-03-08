import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Documents = new Mongo.Collection('documents');
/**
 * Effectue une sauvegarde à chaque modification. 
 * Les différentes version sont stockées par ordre chronologique dans une array accessible depuis le champs révision.
 */
Documents.attachCollectionRevisions();

if (Meteor.isServer) {
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
            rejete: true,
            type: "texte",
            dernireModificationPar: auteur,
            image: null,
        });
    },

    // methods pour api rest

    'documents.test.insert'(contenu) {

        let lastDoc = Documents.findOne({}, {sort: {creation: -1}});
        let auteur = 'externe';

        let newDoc = {
            session : lastDoc.session,
            chapitre : lastDoc.chapitre,
            contenu : contenu.contenu,
            auteur : auteur,
            creation: new Date(),
            correction: false,
            conformation: false,
            rejete: true,
            type: "texte",
            dernireModificationPar: auteur,
            image: null,
        }

        Documents.insert(newDoc);
    },


    /**
     * Permet de "supprimer un document" en le modifiant. Le contenu est vider et les métadatas sont conservées.
     * La version précédente est sauvagardée automatiquement dans le champs revisions.
     * @param {ObjectId} documentId Identifiant Mongo du document à supprimer
     */
    'documents.remove'(idSuppression, isDocument = true) {

        if (isDocument) {
            Meteor.call('image.remove', idSuppression);
        }

        Documents.remove({
            $or: [{
                _id: idSuppression
            }, {
                session: idSuppression
            }, {
                chapitre: idSuppression
            }]
        });

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
        return Documents.findOne(documentId).revisions.length;
    },

    'documents.addImage'(session, chapitre, auteur, image) {

        Documents.insert({
            session: session,
            chapitre: chapitre,
            contenu: '',
            auteur: auteur,
            creation: new Date(),
            correction: false,
            conformation: false,
            rejete: true,
            type: "image",
            dernireModificationPar: auteur,
            image: image,
        });
    },

    'documents.updateImage'(documentId, documentContenu, image) {

        Documents.update({
            _id: documentId,
        }, {
            $set: {
                image: image,
                type: "image",
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
});