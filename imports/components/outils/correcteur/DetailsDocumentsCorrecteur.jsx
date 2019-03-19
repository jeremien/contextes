import React, { Component } from 'react';
import Moment from 'react-moment'; 

export default class DetailsDocumentCorrecteur extends Component {

    constructor(props) {
        super(props);

        this.state = {
            revised : false,
            contenu : undefined
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    componentDidMount() {
        this.setState({
            contenu : this.props.document.contenu
        })
    }

    handleChange(event) {
        this.setState({ contenu: event.target.value, revised : true });
        // Meteor.call('documents.update', this.props.document._id, this.state.contenu, this.props.utilisateur);

    }

    handleEnter(event) {
        // console.log(event)
        if (event.key !== 'Enter' ) {
            return;
        }
        console.log('enter')
        Meteor.call('documents.update', this.props.document._id, this.state.contenu, this.props.utilisateur);

    }

    render() {

        let { contenu } = this.state;

        return (
            <form className='details-documents'>
                {!!this.props.document.image ? <span className='cfbl fscs'> légende de l'image {<Moment format='HH:mm:ss'>{this.props.document.creation}</Moment>}</span> : undefined}
                <textarea
                    className={!!this.props.document.image ? 'wfull txta py px btt fsc bg bcbb' : 'wfull txta py px btt fsc bg'}
                    value={contenu}
                    onChange={this.handleChange}
                    onKeyPress={this.handleEnter}
                />
            </form>
        )

    }

}