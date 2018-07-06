import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Connexions = new Mongo.Collection('connexions');

if (Meteor.isServer) {
    Meteor.publish('connexions', function connexionsPublication(){
        return Connexions.find();
    })
}

Meteor.methods({
    
    'connexions.insert'(utilisateur, role) {
        Connexions.insert({
            utilisateur: utilisateur,
            role: role,
            session: "",
            chapitre: "",
        });
    },

    'connexions.session'(utilisateur, session) {
        Connexions.update({utilisateur: utilisateur}, {$set: {session: session}})
    },

    'connexions.chapitre'(utilisateur, session, chapitre) {
        Connexions.update({utilisateur: utilisateur}, {$set: {session: session, chapitre: chapitre}})
    },

    'deconnection.session'(utilisateur) {
        Connexions.update({utilisateur: utilisateur}, {$set: {session: ""}})
    },

    'deconnection.chapitre'(utilisateur) {
        Connexions.update({utilisateur: utilisateur}, {$set: {chapitre: ""}})
    },

    'connexions.remove'(utilisateur) {
        Connexions.remove({utilisateur: utilisateur})
    }
})