import { Images } from '../imports/api/collections/images'
import { Meteor } from 'meteor/meteor'

function ajoutDocument(image, doc, session, chapitre, utilisateur) {
    console.log(image)
    if (doc) {
        Meteor.call('documents.updateImage', doc._id, image)
    } else {
        Meteor.call('documents.addImage', session, chapitre, utilisateur, image)
        Meteor.call('log.insert', 'document', `${this.props.utilisateur} a ajouté une image`);
    }
}



Meteor.methods({
    'image.load'(lien, doc, session, chapitre, utilisateur) {
        Images.load(lien, {
            fileName: 'logo.png',
            meta: {},
            onAfterUpload: (error, fileRef) => ajoutDocument(fileRef, doc, session, chapitre, utilisateur),
        });

    }
})