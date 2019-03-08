
const getImagesPath = (documents) => {
    
    let images = documents.filter((item) => {
        return item.image !== null;
    });

    return images.map((item) => {
        return `${item.image._id}${item.image.extensionWithDot}`;
    });
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

export { getImagesPath, getText };