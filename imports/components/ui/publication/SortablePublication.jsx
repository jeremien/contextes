import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

import styled from 'styled-components';

const Container = styled.div`
    display : flex;
    flex-direction : column;
    background: white;
`;

const Item = styled.div`
    border : 1px solid blue;
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
            items : []
        }
    
    }

    componentDidMount() {
        this.setState({
            items : this.props.data
        })
    }

    
    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState({
            items : arrayMove(this.state.items, oldIndex, newIndex),
        });
        Meteor.call('publication.update', this.props.id, this.state.items)
    };

    render() {

        // console.log(this.state, this.props.data)

        return <SortableList 
                    items={this.state.items}
                    onSortEnd={this.onSortEnd}
                />

    }

}

export default SortablePublication;