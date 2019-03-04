
const getImagesPath = (documents) => {
    
    // console.log(documents);

    let images = documents.filter((item) => {
        return item.image !== null;
    });

    return images.map((item) => {
        return `${item.image._id}${item.image.extensionWithDot}`;
    });
}

const getText = (documents) => {
    
    const text = documents.map((item) => {
        return item.contenu;
    });
    
    return text.join('\n');
}

export { getImagesPath, getText };