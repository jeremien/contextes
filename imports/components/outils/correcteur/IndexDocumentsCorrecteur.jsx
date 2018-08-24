import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom'

class IndexDocumentsCorrecteur extends Component {

    render() {

        console.log(this.props)

        return (

            <ul className='details-documents'>

                <li>
                    <p>à {this.props.document.creation.toLocaleTimeString()}</p>
                    <p>par {this.props.document.auteur}</p>
                    <button>Modifier</button>

                </li>

            </ul>

        )

    }
}

export default IndexDocumentsCorrecteur;

