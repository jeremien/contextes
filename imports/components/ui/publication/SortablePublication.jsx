import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { Input, Button, Divider } from 'antd';

import styled from 'styled-components';

// let dataUpdate;

const Container = styled.div`
    display : flex;
    flex-direction : column;
    // background: white;
`;

const Item = styled.div`
    border : 1px solid grey;
    padding : 10px;
    margin-top : 5px;
`;

const SortableItem = SortableElement( ( { value} ) => {
    // console.log(value)
    return <Item >{value}</Item>
});

const SortableList = SortableContainer( ({ items }) => {
    return (
        <Container>
            {items.map((value, index) => {
                return <SortableItem 
                            key={`item-${index}`}
                            index={index}
                            value={value}
                        />
            })}
        </Container>
    )
});

class SortablePublication extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items : [],
            texte : null
            
        }

        this.sendTexte = this.sendTexte.bind(this);
        this.handleTexteChange = this.handleTexteChange.bind(this);
    
    }

    componentDidMount() {
        this.setState({
            items : this.props.data
        })
    }

    sendTexte() {
        console.log('send')
        this.state.items.push(this.state.texte);
        Meteor.call('publication.updateData', this.props._id, this.state.items);
        this.forceUpdate();
        this.setState({
            texte : null
        });
    }

    handleTexteChange(event) {
        this.setState({ texte: event.target.value });
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState({
            items : arrayMove(this.state.items, oldIndex, newIndex),
        });
        Meteor.call('publication.updateData', this.props.id, this.state.items)
    };

    render() {

        // let { data } = this.props;
        // dataUpdate = [...data]

        console.log(this.state)

        return ( 
            <div>

                <Input placeholder='texte'
                            value={this.state.texte}
                            onChange = { this.handleTexteChange }
                            onPressEnter = { () => console.log('texte') }
                        />

                <Button onClick={ this.sendTexte }>Ajouter du texte</Button> 

                <Divider />
                
                <SortableList 
                    items={this.state.items}
                    onSortEnd={this.onSortEnd}
                />
            </div>
            )

    }

}

export default SortablePublication;