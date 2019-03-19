import {
    Mongo
} from 'meteor/mongo';
import {
    Meteor
} from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

/**
 * Collection gérant les informations de connexions.
 * Si il y a besoin de la version web, le système d'utilisateur de Meteor est utilisé en parallèle. 
 * Toute les informations annexes (role, sessions, etc) restent stockées dans la collection Connexions.
 * Cela facilite le passage d'une version à l'autre et est plus facile à utiliser que des champs personnalisés dans la base de données user de Meteor.
 */
export const Connexions = new Mongo.Collection('connexions');

if (Meteor.isServer) {
    Meteor.publish('connexions', function connexionsPublication() {
        return Connexions.find();
    })
}

Meteor.methods({

    'connexions.insert.web'(utilisateur, password, email) {
        const data = {
            username: utilisateur,
            password: password,
            email: email,
        };
        const id = Accounts.createUser(data);        
        return id;
    },

    'connexions.insert.local'(idMeteor, utilisateur, role, socketId) {
        // console.log(!!idMeteor)
        let id = null;
        if (!!idMeteor) {
            id = Connexions.insert({
                _id: idMeteor,
                username: utilisateur,
                role: role,
                socketId: socketId,
                session: [],
                chapitre: "",
                online: true,
                typing: false,
                userSession: [],
            });
        }
        else {
            id = Connexions.insert({
                username: utilisateur,
                role: role,
                socketId: socketId,
                session: [],
                chapitre: "",
                online: true,
                typing: false,
                userSession: [],
            });
        }
        return id;
    },
    'connexions.role'(utilisateur, role) {
        Connexions.update({ _id: utilisateur }, { $set: { role: role } })
    },

    'connexions.session'(utilisateur, session) {
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

    'connexions.ecrit'(utilisateur) {
        Connexions.update({
            _id: utilisateur
        },
            {
                $set: { typing: true }
            })
    },

    'connexions.ecrit.pas'(utilisateur) {
        Connexions.update({
            _id: utilisateur
        },
            {
                $set: { typing: false }
            })
    }
})