import React from 'react';
import Timer from './Timer'

import { Button, Icon, Divider } from 'antd';

/**
 * Permet l'affichage des méta-data et propriétés d'un chapitre.
 * Le chapitre en question doit être passé directement en props
 */
export default function InfosChapitre(props) {

    // console.log(props)

    return (
        
        <div >
            
            <Button 
                type="default"
                onClick={() => {
                    props.history.push(`/sessions/${props.chapitre.session}`)
                }}
            >
                <Icon type="left" /> Retour à la session
            </Button>
            
            <Divider/>
        
            <p>description : {props.chapitre.description}</p>

            {/* <p>nombre de documents : </p> */}
            {/* <p>nombre de documents corrigés : </p> */}
            {/* <p>tags à utiliser : </p> */}


            {/* {!!props.connecte && props.role === "editeur" || props.role === "transcripteur" ? <p>Temps de transcription restant : {props.chapitre.timer}</p> : undefined} */}
            <Divider/>
            <Timer {...props} />

        </div>
    )
}