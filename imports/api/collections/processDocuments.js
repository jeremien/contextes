import { Sessions } from './sessions';
import { Chapitres } from './chapitres';
import { Documents } from './documents';
import { Images } from './images';

const ProcessAllDocs = (sessionTitre) => {

    return getLastSessionInfos(sessionTitre);

}

const getLastSessionInfos = (sessionTitre) => {
    // const session = Sessions.find({}, { sort : { creation : -1 }}).fetch();
    const session = Sessions.find({ titre : sessionTitre.session }).fetch();

    let { _id, titre, auteur, creation, description } = session[0];
    let chapitres = getAllChapitres(_id);
    // console.log(chapitres)

    let session_infos = [ {
        _id,
        titre,
        auteur,
        creation,
        description,
        chapitres
    } ]

    return session_infos ? session_infos : null;
}

const getAllChapitres = (sessionId) => {
    
    const chapitres = Chapitres.find({ session : sessionId }, { sort : {creation : 1 }}).fetch();
    
    // console.log('chapitres', chapitres)

    let chapitres_infos = []

    chapitres.forEach((item) => {

        let { _id, titre, auteur, description, isOpen } = item;

        // if (!isOpen) {
            let documents = getAllDocuments(_id);
            let chapitre = { _id, titre, auteur, description, documents };
            chapitres_infos.push(chapitre);
        // }

    });

    console.log(chapitres_infos)

    return chapitres_infos ? chapitres_infos : null;

}

const getAllDocuments = (chapitresId) => {

    const documents = Documents.find({ chapitre : chapitresId }, { sort : { ref : 1 }}).fetch();
    
    let documents_infos = [];

    documents.forEach((item) => {

        let { contenu, rejete, image, correction } = item;

        if ( !rejete ) {

            if (image !== null) {
                let imageLink = getAllImages(image);
                let doc = { contenu : contenu, image : imageLink };
                documents_infos.push(doc);
            } else {
                let doc = { contenu : contenu };
                documents_infos.push(doc);
            }
        }

    });

    return documents_infos ? documents_infos : null;

}

const getAllImages = (imageId) => {
    const image = Images.findOne({ _id : imageId });
    return image ? image.link('original') : null;

}

export { ProcessAllDocs };