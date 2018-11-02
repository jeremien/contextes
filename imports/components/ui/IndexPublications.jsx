import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Button } from 'antd';

class IndexPublications extends Component {

    renderActionPublications(item) {

        return [
            <Button
                type='danger'
                onClick={() => {
                    Meteor.call('publication.remove', item._id)
                }}
            >
                Supprimer
            </Button>
        ]

    }

    render() {

        console.log(this.props)
        
        if (this.props.publications != 0 && this.props.role === 'editeur') {

            return (
                <List
                    header={<div>liste des publications</div>}
                    bordered
                    dataSource={this.props.publications}
                    renderItem={ (item, index) => {

                        return (
                            <List.Item
                                actions={this.renderActionPublications(item)}
                            >
                               <Link to={`/publication/${item._id}`}>{item.titre}</Link> 
                            </List.Item>
                        )

                    }}
                />
            )

        } else {

            return <div>il n'y a pas de document ou vous n'êtes pas éditeur</div>
        }

    }


}

export default IndexPublications;