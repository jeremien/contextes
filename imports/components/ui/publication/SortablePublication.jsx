import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

const SortableItem = SortableElement( ({ value }) => {
    return <li>{value}</li>
});

const SortableList = SortableContainer( ({ items }) => {
    return (
        <ol>
            {items.map((value, index) => {
                return <SortableItem 
                            key={`item-${index}`}
                            index={index}
                            value={value}
                        />
            })}
        </ol>
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