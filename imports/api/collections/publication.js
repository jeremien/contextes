import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';


export const Publications = new Mongo.Collection('publications');

if (Meteor.isServer) {
    Meteor.publish('publications', function publicationsPublication() {
        return Publications.find();
    })
}

  
Meteor.methods({

    /*------------------

        les publications comme des screenshots d'une collection de chapitres
        avec titre de la publication, date de création
        à réorganiser
        titre : string
        data : [
            {
                titre : chapitre,
                session : id,
                contenu : [ 'contenu des documents' ]
            }
        ]

    --------------------*/

    'publication.insert'(selection, sessionId) {
        // console.log(data)
        Publications.insert({
            session : sessionId,
            creation : new Date(),
            titre : selection.titre,
            data : selection.contenu
        })

    },

    'publication.update'(publicationId, data) {
        Publications.update(publicationId, {
            $set : {
                data
            }
        })
    }

});