import { Images } from '../../api/collections/images';
import gm from 'gm';
import fs from 'fs';

const bound = Meteor.bindEnvironment((callback) => {
    return callback();
});

const createSmallImage = (fileRef, callback) => {

    console.log('process image function')

    const dstPath = `${(Images.storagePath(fileRef))}/small-${fileRef._id}.${fileRef.extension}`;
    const srcPath = fileRef.path;

    const img = gm(srcPath)
        .quality(70)
        .define('filter:support=2')
        .define('jpeg:fancy-upsampling=false')
        .define('jpeg:fancy-upsampling=off')
        .define('png:compression-filter=5')
        .define('png:compression-level=9')
        .define('png:compression-strategy=1')
        .define('png:exclude-chunk=all')
        .autoOrient()
        .noProfile()
        .strip()
        .dither(false)
        .interlace('Line')
        .filter('Triangle');

    img.resize(1000).interlace('Line').write(dstPath, (err) => {
            bound(() => {
            if (err) {
                callback(Meteor.Error(err));
                return;
            }

            fs.stat(dstPath, (err, stat) => {
                bound(() => {
                    if (err) {
                        callback(Meteor.Error(err));
                        return;
                    }

                    const upd = { $set: {} };

                    upd['$set']['versions.small'] = {
                        path: dstPath,
                        size: stat.size,
                        type: fileRef.type,
                        extension: fileRef.extension
                    }

                    Images.update(fileRef._id, upd, (err) => {
                        if (err) {
                            callback(Meteor.Error(err));
                        }

                        fs.chmod(dstPath, 774, (err) => {
                            if (err) {
                                callback(Meteor.Error(err));
                            }
                        });

                    });

               
                });
            });
        });
    });

    return true;

}

export { createSmallImage };