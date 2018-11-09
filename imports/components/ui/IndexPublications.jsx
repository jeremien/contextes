import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Button } from 'antd';

class IndexPublications extends Component {

    renderActionPublications(item) {

        return [
            <Button
                type='default'
                onClick={() => {
                    this.props.history.push(`/publication/${item._id}`)
                }}
            >
                Éditer
            </Button>,
            <Button
                type='default'
                onClick={() => {
                    this.props.history.push(`/publication/${item._id}/layout`)
                }}
            >
                Exporter
            </Button>,
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

        // console.log(this.props)
        
        if (this.props.publications != 0 && this.props.role === 'editeur') {

            return (
                <List
                    header={<div>liste des publications</div>}
                    bordered
                    dataSource={this.props.publications}
                    renderItem={ (item) => {

                        return (
                            <List.Item
                                actions={this.renderActionPublications(item)}
                            >
                               {item.creation.toLocaleDateString()}, {item.titre}
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