import React, { Component } from 'react';

import SortablePublication from './publication/SortablePublication';
import LayoutPublication from './publication/LayoutPublication';

import { Input, Button, Divider } from 'antd';
import { Meteor } from 'meteor/meteor';


class DetailsPublication extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modTitre : false,
            titre : null        }

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
        let res = this.props.data.join();
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
        // console.log(this.state)
        // console.log(this.props.layout)

        let { data, _id, layout } = this.props;
        // dataUpdate = [...data];
        

        let { modTitre, titre } = this.state;
        let dataLayout = this.renderDataLayout();
        // console.log(data.join())

        // console.log(dataUpdate)

        return (
            
            <div>
                   { modTitre ?
                        <Input placeholder='titre'
                            value={this.state.titre}
                            onChange = { this.handleTitreChange }
                            onPressEnter = { this.updateTitre }
                        />  :
                        <h4 onClick={this.changeTitre}>{this.state.titre}</h4> 
                   }

                    <Divider />

                   


                { 
                    !layout ? 
                        <SortablePublication data={data} id={_id} /> :
                        <LayoutPublication data={dataLayout} />
                }
                
            </div>
                

        )

    }

}

export default DetailsPublication;