import { Meteor } from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';
import fs from 'fs';

import { createSmallImage } from './processImages';

export const Images = new FilesCollection({
    debug: false,
    storagePath: () => {

        return `${process.env.PWD}/assets`;

        // if (!Meteor.isProduction) {
        //     return `${process.env.PWD}/assets`;
        // } else {
        //     return `/srv/contextes/data/images`;
        // }
        
    },
    permissions: 0o775,
    parentDirPermissions: 0o775,
    collectionName: 'images',
    allowClientCode: false, // Disallow remove files from Client
    onBeforeUpload(file) {
        // Allow upload files under 10MB, and only in png/jpg/jpeg formats
        if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
            return true;
        }
        return 'Please upload image, with size equal or less than 10MB';
    },
    onAfterUpload(file) {

           if (/png|jpe?g/i.test(file.extension || '')) {

            createSmallImage(file, (res, error) => {
      
                if (error) {
                    console.error(error);
                  return;
                }
               
            });
      
          }
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
