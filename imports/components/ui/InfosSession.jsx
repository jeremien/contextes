import React from 'react';
import Moment from 'react-moment';

export default function InfosSession(props) {
    
    // TODO: afficher le nombre d'utilisateurs connectés

    const { titre, etat, auteur, password, description, creation, lastModified } = props.session;

    return (
        <div className='infos-session'>
            <p>la session {titre} ({description}) à le statut : {etat} </p>
        </div>
    )

}