import { Images } from '../../api/collections/images';

const getImageLink = (document) => {
    if (document.image !== null) {
        let img = Images.findOne({_id: document.image._id });
        return img ? img.link() : null;
    } else {
        return null;
    }
};



export { getImageLink };