import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';


export const Logs = new Mongo.Collection('logs');

if (Meteor.isServer) {
    Meteor.publish('logs', function logsPublication() {
        return Logs.find();
    })
}


Meteor.methods({

    /*
    * schéma des logs
    *   
    *   type : string,
    *   date : date,
    *   contenu : string
    * 
    */

    'log.insert'(type, contenu) {
        // console.log('log', type, contenu)
        Logs.insert({
            type,
            creation : new Date(),
            contenu
        })

    }


})