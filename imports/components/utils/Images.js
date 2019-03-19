import { Images } from '../../api/collections/images';

const getImageLink = (document) => {

    if (document.image !== null) {
        let img = Images.findOne({_id: document.image });
        return img ? img.link('small') : null;
    } else {
        return null;
    }
};



export { getImageLink };