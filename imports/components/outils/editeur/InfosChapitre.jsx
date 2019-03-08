import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ConnexionsCourantesContainer from '../../data/ConnexionsCourantesContainer';

class InfosChapitre extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen : props.chapitre.isopen,
            url : props.chapitre.archive
        }
    }

    render() {

        return (

            <div className='infos-chapitre'>
                
                <p>Le chapitre {this.props.chapitre.titre} ({this.props.chapitre.description}) créé par {this.props.chapitre.auteur} contient 0 documents et est actuellement {this.props.chapitre.isopen ? 'fermé' : 'ouvert'} </p>
                
                <button onClick={() => {
                    Meteor.call('chapitres.isOpen', this.props.chapitre._id, true, (error, result) => console.log(error, result) );
                }
                }>Fermer le chapitre</button>
                
                <button onClick={() => {
                    Meteor.call('chapitres.export', this.props.chapitre._id, (error, result) => {
                        if (error) {
                            console.log(error);
                        }
                        this.setState({
                            url : result
                        });
                    });
                }
                }>Exporter le chapitre</button>

                <p><a href={this.state.url} target='_blank'>Télécharger</a></p>
                
                <ConnexionsCourantesContainer {...this.props} />
    
            </div>
    
        )

    }

} 

export default InfosChapitre;