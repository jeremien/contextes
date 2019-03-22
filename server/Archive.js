import { Images } from '../imports/api/collections/images';

const getImagesInfos = (documents) => {
    
    const images = documents.filter((item) => {
        return item.image !== null;
    });

    let images_data = []

    images.map((item) => {
        let image = Images.find({_id : item.image}).fetch();
        let obj = {
            name : image[0].name,
            id : image[0]._id,
            path : image[0].versions.original.path
        }
        images_data.push(obj)
    });

    return images_data
}

const getText = (documents) => {
    
    const text = documents.map((item) => {

        let contenu = [];

        if (item.image !== null) {
            contenu.push(`image : ${item.image._id}`);
        }

        contenu.push(item.contenu);
        
        return contenu;
    });
    
    return text.join('\n');
}

export { getImagesInfos, getText };