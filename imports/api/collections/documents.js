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
            image: null
        });
    },

    /**
     * Permet de "supprimer un document" en le modifiant. Le contenu est vider et les métadatas sont conservées.
     * La version précédente est sauvagardée automatiquement dans le champs revisions.
     * @param {ObjectId} documentId Identifiant Mongo du document à supprimer
     */
    'documents.remove'(idSuppression) {
        // Documents.update({_id: documentId}, {$set: {type: null}})
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
        // check(documentId, String);
        // checked(contenu, String);
        Documents.update(documentId, {
            $set: {
                contenu: contenu,
                dernireModificationPar: utilisateur
            }
        });
    },

    'commenrtaires.getVersion'(documentId) {
        return Documents.findOne(documentId).revisions.length
    },

    'documents.addImage'(document, image) {
        console.log('ajout image')
        Documents.update({
            _id: document,
        }, {
            image: image,
        });
        // console.log('image ajoutéé', image)
    }


})