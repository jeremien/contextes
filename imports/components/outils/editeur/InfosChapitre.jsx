import React from 'react';
import ConnexionsCourantesContainer from '../../data/ConnexionsCourantesContainer';

const InfosChapitre = (props) => {

    let { chapitre } = props;

    return (

        <div className='infos-chapitre'>
            
            <p>Le chapitre {chapitre.titre} ({chapitre.description}) créé par {chapitre.auteur} contient 0 documents et est actuellement {props.chapitre.isopen ? 'fermé' : 'ouvert'} </p>
            
            <button onClick={() => {
                Meteor.call('chapitres.isOpen', chapitre._id, true);
            }
            }>Fermer le chapitre</button>
            
            <button onClick={() => {
                Meteor.call('chapitres.export', chapitre._id);
            }
            }>Exporter le chapitre</button>
            
            <ConnexionsCourantesContainer {...props} />

        </div>

    )


} 

export default InfosChapitre;