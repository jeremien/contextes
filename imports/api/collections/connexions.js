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

    'connexions.insert'(utilisateur, role, socket) {
        const id = Connexions.insert({
            utilisateur: utilisateur,
            role: role,
            socket: socket,
            session: "",
            chapitre: "",
            online: true,
        });

        return id
    },

    // 'connexions.session' (utilisateur, session) {
    //     Connexions.update({
    //         _id: utilisateur
    //     }, {
    //         $set: {
    //             session: session,
    //             online: true,
    //         }
    //     })
    // },

    'connexions.chapitre'(utilisateur, session, chapitre) {
        // console.log('connexion chap')
        Connexions.update({
            _id: utilisateur
        }, {
            $set: {
                session: session,
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
        console.log('online')
        Connexions.update({
            _id: utilisateur
        }, {
            $set: {
                online: true
            }
        })
    },

    'connexions.offline'(utilisateur) {
        console.log('offline')
        Connexions.update({
            _id: utilisateur
        }, {
            $set: {
                online: false
            }
        })
    },

    'connexions.socket'(utilisateur, socket) {
        Connexions.update({
            _id: utilisateur
        }, {
            $set: {
                socket: socket
            }
        })
    }
})