import React from 'react';
import { Card } from 'antd';

/**
 * Permet l'affichage des méta-data et propriétés d'une session.
 * La session en question doit être passée directement en props
 */

const categories = (props) => {
    if (props.session.categories != 0) {
        return props.session.categories.map((item, key) => <li key={key}>{item}</li>)
    } else {
        return <li>pas de catégories</li>
    } 
}

export default function InfosSession(props) {
 
    return (

        <Card title={`session : ${props.session.titre}`} style={{ marginBottom:'20px' }}>
            <p>auteur : {props.session.auteur}</p>
            <p>date de création : {props.session.creation.toLocaleDateString()}</p>
            <p>dernière modification : {props.session.lastModified.toLocaleDateString()}</p>
            {/* <ul>catégories : {
                categories(props)
            }</ul> */}
        </Card>
    )

}