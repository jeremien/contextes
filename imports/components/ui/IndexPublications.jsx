import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List } from 'antd';

class IndexPublications extends Component {

    render() {
        
        if (this.props.publications != 0) {

            return (
                <List
                    header={<div>liste des publications</div>}
                    bordered
                    dataSource={this.props.publications}
                    renderItem={ (item, index) => {

                        return (
                            <List.Item>
                               <Link to={`/publication/${item._id}`}>{item.titre}</Link> 
                            </List.Item>
                        )

                    }}
                />
            )

        } else {

            return <div>pas de document</div>
        }

        return <div>index</div>

    }


}

export default IndexPublications;