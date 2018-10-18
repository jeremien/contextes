import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';


export const Publications = new Mongo.Collection('publications');

  
Meteor.methods({

    /*------------------

        les publications comme des screenshots d'une collection de chapitres
        avec titre de la publication, date de création
        à réorganiser
        titre : string
        data : [
            {
                titre : chapitre,
                contenu : [ ]
            }
        ]

    --------------------*/

    'publication.insert'(selection) {
        // console.log(data)
        Publications.insert({
            creation : new Date(),
            titre : null,
            data : [
                selection
            ]
        })

    }

});