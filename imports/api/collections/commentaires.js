import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Commentaires = new Mongo.Collection('commentaires');
/**
 * Effectue une sauvegarde à chaque modification. 
 * Les différentes version sont stockées par ordre chronologique dans une array accessible depuis le champs révision.
 */
Commentaires.attachCollectionRevisions();

if (Meteor.isServer) {
    Commentaires.attachCollectionRevisions();
    Meteor.publish('commentaires', function commentairesPublication(){
        return Commentaires.find();
    });
}

Meteor.methods({
    /**
     * 
     * @param {object} session Session parente sous la forme {sessionId: ObjetId, sessionTitre: String}
     * @param {object} chapitre Chapitre parent sous la forme {chapitreId: ObjectId, chapitreTitre: String} 
     * @param {string} contenu Contenu du commentaire 
     * @param {object} auteur Auteur du commentaire sous la forme {auteurId: ObjetId, auteurNom: string}.
     */
    'commentaires.insert'(session, chapitre, contenu, auteur) {
        Commentaires.insert({
            session: session,
            chapitre: chapitre,
            contenu: contenu,
            auteur: auteur,
            creation: new Date(),
            edition: true,
            archive: false,
        });
    },

    /**
     * Permet de "supprimer un commentaire" en le modifiant. Le contenu est vider et les métadatas sont conservées.
     * La version précédente est sauvagardée automatiquement dans le champs revisions.
     * @param {ObjectId} commentaireId Identifiant Mongo du commentaire à supprimer
     */
    'commentaire.remove'(commentaireId) {
        check(commentaireId, String);
        Commentaires.update(commentaireId, {$set: {contenu: null}}); 
    },
    /**
     * La sauvegarde de la version précédente est faire grâce au module todda00:collection-revisions
     * @param {*} commentaireId 
     * @param {*} contenu 
     */
    'commentaires.update'(commentaireId, contenu){
        // check(commentaireId, String);
        // checked(contenu, String);
        Commentaires.update(commentaireId, {$set: {contenu: contenu}});
    },

    'commenrtaires.getVersion'(commentaireId) {
        return Commentaires.findOne(commentaireId).revisions.length
    },

})