import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Publications } from '../../api/collections/publication'
import { Link } from 'react-router-dom';

import { Button, Divider } from 'antd';

import DetailsPublication from '../ui/DetailsPublication';

class DetailsPublicationsContainer extends Component {

    render() {

        // console.log(this.props)

        if (this.props.publicationsExists && !this.props.loading) {

            let { publication } = this.props;

            // console.log(publication._id)

            if (this.props.role === 'editeur') {

                    return (
                        <div>
                            <Button.Group>
                                <Button onClick={() => this.props.history.push(`/publications`)}>Retour aux publications</Button>
                                <Button onClick={() => {
                                    if( this.props.layout ) {
                                        return this.props.history.push(`/publication/${publication._id}`)
                                    } else {
                                        return this.props.history.push(`/publication/${publication._id}/layout`)
                                    }
                                }}>{this.props.layout ? 'Éditer' : 'Exporter'}</Button>
                            </Button.Group>
                            <Divider/>
                            <DetailsPublication {...publication} {...this.props} />
                        </div>
                        );               
            
            } else {

                // TODO: afficher les publications à consulter pour les autres rôles
                return <div>publication non modifiable</div>
            }

            

        } else {

            return <div>chargement</div>
        }
    }
}

export default DetailsPublicationsContainer = withTracker((props) => {

    const publicationsHandle = Meteor.subscribe('publications');
    const loading = !publicationsHandle.ready();
    const publication = Publications.findOne(
        {
            _id : props.match.params.idPublication
        }
    );
    const publicationsExists = !loading && !!publication;

    return ({
        loading,
        publicationsExists,
        publication: publicationsExists ? publication : []
    })

})(DetailsPublicationsContainer);