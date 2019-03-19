import { Images } from '../imports/api/collections/images'
import { createSmallImage } from './processImages';

Images.on('afterUpload', (fileRef) => {

  console.log('process image', ref)

  if (/png|jpe?g/i.test(fileRef.extension || '')) {

      createSmallImage(fileRef, (error) => {

          if (error) {
              console.error(error);
          } else {
            Meteor.call('documents.addImage', document, 'image')
          }

      });
  }

});


// Images.on('afterUpload', function(fileRef) {
//   // Run `createThumbnails` only over PNG, JPG and JPEG files
//   if (/png|jpe?g/i.test(fileRef.extension || '')) {
//     createThumbnails(this, fileRef, (error, fileRef) => {
//       if (error) {
//         console.error(error);
//       }
//       else {
//         Meteor.call('documents.addImage', document, 'image')
//       }
//     });
//   }
// });

