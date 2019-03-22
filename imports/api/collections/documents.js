import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { Images } from './images';
import { check } from 'meteor/check';


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

        let ref = null;
        let lastRef = Documents.findOne({ chapitre : chapitre }, {sort: { ref: -1 }});

        if (lastRef != undefined) {
            ref = parseInt(lastRef.ref) + 1;
        } else {
            ref = 1;
        }

        // check(ref, Number)
        
        Documents.insert({
            ref : ref,
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

    // methods pour api rest

    'documents.test.insert'(contenu) {

      
        let lastDoc = Documents.findOne({}, {sort: { ref: -1 }});
        let auteur = 'externe';

        let ref = null;

        if (lastDoc.ref != undefined) {
            ref = parseInt(lastDoc.ref) + 1;
        } else {
            ref = 1;
        }


        let newDoc = {
            ref : ref,
            session : lastDoc.session,
            chapitre : lastDoc.chapitre,
            contenu : contenu.contenu,
            auteur : auteur,
            creation: new Date(),
            correction: false,
            conformation: false,
            rejete: false,
            type: "texte",
            dernireModificationPar: auteur,
            image: null,
        }

        Documents.insert(newDoc);
    },

    'documents.plenty.insert'(contenu) {

        // console.log(contenu.type, contenu)

        let lastDoc = Documents.findOne({}, {sort: { ref: -1 }});
        let auteur = 'plenty';

        let ref = null;

        if (lastDoc.ref != undefined) {
            ref = parseInt(lastDoc.ref) + 1;
        } else {
            ref = 1;
        }


        if (lastDoc) {

            if (contenu.type === 'text') {

                let newDoc = {
                    ref : ref,
                    session : lastDoc.session,
                    chapitre : lastDoc.chapitre,
                    contenu : contenu.data,
                    data : [ contenu.x, contenu.y, contenu.z ],
                    auteur : auteur,
                    creation: new Date(),
                    correction: false,
                    conformation: false,
                    rejete: false,
                    type: "texte",
                    dernireModificationPar: auteur,
                    image: null,
                }
                
                Documents.insert(newDoc);
            
            } else {

                let newDoc = {
                    ref : ref,
                    session : lastDoc.session,
                    chapitre : lastDoc.chapitre,
                    contenu : contenu.data,
                    data : [ contenu.x, contenu.y, contenu.z ],
                    auteur : auteur,
                    creation: new Date(),
                    correction: false,
                    conformation: false,
                    rejete: false,
                    type: "svg",
                    dernireModificationPar: auteur,
                    image: null,
                }

                
                Documents.insert(newDoc);

            }

        } else {
            console.log('pas de documents')
        }

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

    'documents.ref.update'(documentId, ref, oldRef, chapitre) {
        let prevRef = Documents.findOne({"$and" : [ { chapitre : chapitre}, {ref: parseInt(ref)}]});
        // update previous doc
        Documents.update(prevRef._id, { $set : { ref : parseInt(oldRef) }});
        // update current doc
        Documents.update(documentId, { $set: { ref : parseInt(ref) }});

    },

    'documents.rejet'(documentId, rejete) {
        Documents.update(documentId, {
            $set: {
                rejete: !rejete
            }
        });
    },

    // 'documents.accepte'(documentId) {
    //     Documents.update(documentId, {
    //         $set: {
    //             rejete: false
    //         }
    //     });
    // },

    'commenrtaires.getVersion'(documentId) {
        return Documents.findOne(documentId).revisions.length;
    },

    'documents.addImage'(session, chapitre, auteur, image) {

        let ref = null;
        let lastRef = Documents.findOne({ chapitre : chapitre }, {sort: { ref: -1 }});

        if (lastRef != undefined) {
            ref = parseInt(lastRef.ref) + 1;
        } else {
            ref = 1;
        }

        Documents.insert({
            ref : parseInt(ref),
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

    'documents.updateImage'(documentId, image) {

        let doc = Documents.findOne({ _id : documentId});
        Images.remove({_id : doc.image});

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