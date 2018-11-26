import {
    Meteor
} from 'meteor/meteor';
import {
    FilesCollection
} from 'meteor/ostrio:files';

export const Images = new FilesCollection({
    collectionName: 'Images',
    debug: false,
    storagePath: () => {
        return `${process.env.PWD}/assets`;
    },
    allowClientCode: false, // Disallow remove files from Client
    onBeforeUpload(file) {
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
            return true;
        }
        return 'Please upload image, with size equal or less than 10MB';
    }
});

if (Meteor.isClient) {
    Meteor.subscribe('files.images.all');
}

if (Meteor.isServer) {
    Meteor.publish('files.images.all', function () {
        return Images.find().cursor;
    });
}

function ajoutDocument(fileRef, doc) {
    if (doc) {
        Meteor.call('documents.updateImage', doc, image)
    } else {
        Meteor.call('documents.addImage', this.props.chapitre.session, this.props.chapitre._id, this.props.utilisateur, image)
        Meteor.call('log.insert', 'document', `${this.props.utilisateur} a ajouté une image`);
    }
}
 
function load() {
    Images.load('https://raw.githubusercontent.com/VeliovGroup/Meteor-Files/master/logo.png', {
        fileName: 'logo.png',
        fileId: 'abc123myId', //optional
        meta: {}
    });
}


// Meteor.methods({
//     'image.load'(lien, doc) {
//         // Images.load('https://o.aolcdn.com/images/dims3/GLOB/crop/1048x525+0+53/resize/630x315!/format/jpg/quality/85/http%3A%2F%2Fo.aolcdn.com%2Fhss%2Fstorage%2Fmidas%2Ff57d0720404e30b68000b049768694de%2F205334265%2Fgvh.jpg', {
//         //     fileName: 'logo.png',
//         //     meta: {},
//         //     onAfterUpload: (error, fileRef) => ajoutDocument(fileRef, doc),
//         // });
//         load();
//     }
// })