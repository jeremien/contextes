import React, { Component } from 'react';

import SortablePublication from './publication/SortablePublication';
import LayoutPublication from './publication/LayoutPublication';

import { Input, Button, Divider, Tooltip } from 'antd';
import { Meteor } from 'meteor/meteor';
import { markdown } from 'markdown';

class DetailsPublication extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modTitre : false,
            titre : null        
        }

        this.changeTitre = this.changeTitre.bind(this);
        this.handleTitreChange = this.handleTitreChange.bind(this);
        
        this.updateTitre = this.updateTitre.bind(this);
       
    }

    componentDidMount() {

        let titre = this.props.publication.titre;

        this.setState({
            titre
        })
    }

    changeTitre = () => {
        this.setState( {
            modTitre : !this.state.modTitre
        })
    }

    renderDataLayout() {

        const str = this.props.publication.data.map((item) => {

            // console.log(item)

            return item;
        })

        const res = str.join(' ')

        return res;

    }

    handleTitreChange(event) {
        // console.log(event)
        this.setState({ titre: event.target.value });
        
    }

    updateTitre() {
        this.setState({ modTitre : false })
        Meteor.call('publication.updateTitre', this.props._id, this.state.titre);
    }

    render() {

        // console.log(this.props)

        let { data, _id } = this.props.publication;        
        let { modTitre, titre } = this.state;
        let dataLayout = this.renderDataLayout();

        // console.log(data)

        return (
            
            <div>   
                
                { !this.props.layout && 
                    <div>
                        <label>Modifier le titre</label>
                        { modTitre ?
                                    <Input placeholder={<h2>titre</h2>}
                                        value={titre}
                                        onChange = { this.handleTitreChange }
                                        onPressEnter = { this.updateTitre }
                                    />  :
                                    <Tooltip title='Cliquer pour changer le titre de la publication et appuyer sur entrer'>
                                        <h4 onClick={this.changeTitre}>{this.state.titre}</h4>
                                    </Tooltip>
                        }

                        <Divider />
                    </div>
                }

                {/* <SortablePublication data={data} id={_id} /> */}

                
                { 
                    !this.props.layout ? 
                        <SortablePublication data={data} id={_id} /> :
                        <LayoutPublication titre={this.props.publication.titre} date={this.props.publication.creation.toLocaleDateString()} data={dataLayout} />
                }
                
            </div>
                

        )

    }

}

export default DetailsPublication;