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

        let titre = this.props.titre;

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
        // let res = this.props.data.join();
        // return res;

        const html = this.props.data.map((item) => {
            return markdown.toHTML(item);
        })

        const res = html.join('')

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

        let { data, _id, layout } = this.props;        
        let { modTitre, titre } = this.state;
        let dataLayout = this.renderDataLayout();

        return (
            
            <div>   
                
                { !layout && 
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


                { 
                    !layout ? 
                        <SortablePublication data={data} id={_id} /> :
                        <LayoutPublication titre={this.props.titre} date={this.props.creation.toLocaleDateString()} data={dataLayout} />
                }
                
            </div>
                

        )

    }

}

export default DetailsPublication;