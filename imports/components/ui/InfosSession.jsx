import React from 'react';
import Moment from 'react-moment';

export default function InfosSession(props) {
    
    // TODO: afficher le nombre d'utilisateurs connectés

    const { titre, etat, auteur, password, description, creation, lastModified } = props.session;

    return (
        <div className='infos-session'>
            <p>{titre} ({description}) est en {etat}, créée par {auteur} le <Moment format='DD/MM/YYYY'>{creation}</Moment> et modifiée le <Moment format='DD/MM/YYYY'>{lastModified}</Moment> </p>
        </div>
    )

}