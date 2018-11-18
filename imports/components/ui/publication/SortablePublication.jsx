import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { Input, Button, Divider } from 'antd';
import ReactMarkdown from 'react-markdown';


import styled from 'styled-components';

// let dataUpdate;

const Container = styled.div`
    display : flex;
    flex-direction : column;
    // background: white;
`;

const Item = styled.div`
    border : 1px dashed grey;
    padding : 10px;
    margin-top : 5px;
`;

const SortableItem = SortableElement( ( item ) => {

    // console.log(item)

    

    // let regex = RegExp(/(http(s?))\:\/\//gi);

    // if (regex.test(value)) {
    //     return <Item ><img src={value} width='200px'/></Item>
    // } else {
    //     return <Item >{value}</Item>
    // }

    return <Item>
                {/* <Button>{index}</Button> */}
                <ReactMarkdown source={item.value}></ReactMarkdown>
            </Item>

});

const SortableList = SortableContainer( ({ items }) => {

    // console.log(items)

    let cleanItems = items.filter(o => o);

    // console.log(cleanItems)

    return (
        <Container>
            {cleanItems.map((value, index) => {
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

        // console.log(this.props)

        return ( 
            <div>

                <Input placeholder='texte'
                            value={this.state.texte}
                            onChange = { this.handleTexteChange }
                            onPressEnter = { () => console.log('texte') }
                        />

                <Button onClick={ this.sendTexte }>Ajouter du texte</Button> 
                <Button onClick={ this.sendTexte } disabled>Ajouter un sous-titre</Button>
                <Button onClick={ this.sendTexte } disabled>Ajouter un saut de page</Button>  

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