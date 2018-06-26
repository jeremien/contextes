import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Commentaires = new Mongo.Collection('commentaires');
Commentaires.attachCollectionRevisions();

if (Meteor.isServer) {
    Commentaires.attachCollectionRevisions();
    Meteor.publish('commentaires', function commentairesPublication(){
        return Commentaires.find();
    });
}

Meteor.methods({
    'commentaires.insert'(session, chapitre, contenu, auteur) {
        check(contenu, String);
        check(auteur, String);

        Commentaires.insert({
            session: session,
            chapitre: chapitre,
            contenu: contenu,
            auteur: auteur,
            ecritA: new Date(),
        });
    },

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