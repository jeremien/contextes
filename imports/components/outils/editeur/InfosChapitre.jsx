import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ConnexionsCourantesContainer from '../../data/ConnexionsCourantesContainer';

class InfosChapitre extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen : null,
            url : false
        }
    }

    componentWillMount() {
        this.setState({
            isOpen : this.props.chapitre.isOpen
        })
    }

    render() {

        return (

            <div className='infos-chapitre'>
                
                <p>Le chapitre {this.props.chapitre.titre} ({this.props.chapitre.description}) 
                est {this.props.chapitre.isOpen ? 'ouvert' : 'fermé'} </p>
                {/* <p>Il contient 0 documents et est actuellement {this.props.chapitre.isOpen ? 'ouvert' : 'fermé'} </p> */}
                
                <button className={this.props.chapitre.isOpen ? 'btt bcr bg fcr py txta' : 'btt bcg bg cfgr py txta'} onClick={() => {
                    Meteor.call('chapitres.isOpen', this.props.chapitre._id, this.state.isOpen);
                    this.setState({ isOpen : !this.state.isOpen });
                }
                }>{ this.props.chapitre.isOpen ? 'Fermer' : 'Ouvrir'} le chapitre</button>
                
                {/* <button onClick={() => {
                    

                    Meteor.call('chapitres.export', this.props.chapitre._id, (error, result) => {
                        console.log(result)
                        if (error) {
                            console.log(error);
                        }
                        this.setState({
                            url : result
                        });
                    });
                }
                }>Exporter le chapitre</button> */}

                {/* <p><a href={`http://localhost:3000/export.tar`} target='_blank'>Télécharger</a></p> */}
                    
            </div>
    
        )

    }

} 

export default InfosChapitre;