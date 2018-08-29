import React from 'react';
import Timer from './Timer'

/**
 * Permet l'affichage des méta-data et propriétés d'un chapitre.
 * Le chapitre en question doit être passé directement en props
 */
export default function InfosChapitre(props) {
    return (
        <div className="infos-chapitre">
            <h3 className="titre">Chapitre : {props.chapitre.titre}</h3>
            <p>description : {props.chapitre.description}</p>

            <p>nombre de documents : </p>
            <p>nombre de documents corrigés : </p>
            <p>tags à utiliser : </p>


            {!!props.connecte && props.role === "editeur" || props.role === "transcripteur" ? <p>Temps de transcription restant : {props.chapitre.timer}</p> : undefined}

            <Timer {...props} />

        </div>
    )
}