import React from 'react';
import Timer from './Timer'

import { Button, Icon, Divider } from 'antd';

/**
 * Permet l'affichage des méta-data et propriétés d'un chapitre.
 * Le chapitre en question doit être passé directement en props
 */

const tags = (props) => {
    if (props.chapitre.tags != 0) {
        return props.chapitre.tags.map((item, key) => <li key={key}>{item}</li>)
    } else {
        return <li>pas de tags</li>
    } 
}

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
            <p>tags : {tags(props)}</p>

            <Divider/>
            <Timer {...props} />

        </div>
    )
}