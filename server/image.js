// import uploadsCollection from '/lib/files.js';
// import createThumbnails from '/server/image-processing.js';
import { Document } from '../imports/api/collections/documents'
import { Images } from '../imports/api/collections/images'

Images.on('afterUpload', function(fileRef) {
  // Run `createThumbnails` only over PNG, JPG and JPEG files
  if (/png|jpe?g/i.test(fileRef.extension || '')) {
    createThumbnails(this, fileRef, (error, fileRef) => {
      if (error) {
        console.error(error);
      }
      else {
        Meteor.call('documents.addImage', document, 'image')
      }
    });
  }
});