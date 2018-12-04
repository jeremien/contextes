import {
    Mongo
} from 'meteor/mongo';
import {
    Meteor
} from 'meteor/meteor';

export const Connexions = new Mongo.Collection('connexions');

if (Meteor.isServer) {
    Meteor.publish('connexions', function connexionsPublication() {
        return Connexions.find();
    })
}

Meteor.methods({

    'connexions.insert'(utilisateur, role, socketId) {
        const id = Connexions.insert({
            utilisateur: utilisateur,
            role: role,
            socketId: socketId,
            session: [],
            chapitre: "",
            online: true,
            typing: false,
        });

        return id
    },

    'connexions.role'(utilisateur, role) {
        Connexions.update({_id: utilisateur}, {$set: {role: role}})
    },

    'connexions.session' (utilisateur, session) {
        Connexions.update({
            _id: utilisateur
        }, {
            $push: {
                session: session,
            }
        })
    },

    'connexions.chapitre'(utilisateur, session, chapitre) {
        // console.log('connexion chap')
        Connexions.update({
            _id: utilisateur
        }, {
            $set: {
                chapitre: chapitre,
                online: true,
            }
        })
    },

    // 'deconnection.session' (utilisateur) {
    //     Connexions.update({
    //         _id: utilisateur
    //     }, {
    //         $set: {
    //             online: false
    //         }
    //     })
    // },

    // 'deconnection.chapitre' (utilisateur) {
    //     Connexions.update({
    //         _id: utilisateur
    //     }, {
    //         $set: {
    //             online: false,
    //         }
    //     })
    // },

    'connexions.remove'(utilisateur) {
        Connexions.remove({
            _id: utilisateur
        })
    },

    'connexions.online'(utilisateur) {
        Connexions.update({
            _id: utilisateur
        }, {
            $set: {
                online: true
            }
        })
    },

    'connexions.offline'(utilisateur) {
        Connexions.update({
            _id: utilisateur
        }, {
            $set: {
                online: false
            }
        })
    },

    'connexions.socket'(utilisateur, socketId) {
        Connexions.update({
            _id: utilisateur
        }, {
            $set: {
                socketId: socketId
            }
        })
    },

    'connexions.ecrit' (utilisateur) {
        Connexions.update({
            _id: utilisateur
        },
        {
            $set: {typing: true}
        })
    },

    'connexions.ecrit.pas' (utilisateur) {
        Connexions.update({
            _id: utilisateur
        },
        {
            $set: {typing: false}
        })
    }
})