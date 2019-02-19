import React, { Component } from 'react';

export default class DetailsDocumentCorrecteur extends Component {

    constructor(props) {
        super(props);

        this.state = {
            revised : false,
            contenu : undefined
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            contenu : this.props.document.contenu
        })
    }

    handleChange(event) {
        this.setState({ contenu: event.target.value, revised : true });
        Meteor.call('documents.update', this.props.document._id, this.state.contenu, this.props.utilisateur);

    }

    render() {

        // TODO: identifier l'image
        // console.log(!!this.props.document.image)

        let { contenu } = this.state;

        return (
            <form className='details-documents'>
                <textarea
                    className={!!this.props.document.image ? 'wfull txta py px btt fsc bg bcbb' : 'wfull txta py px btt fsc bg'}
                    value={contenu}
                    onChange={this.handleChange}
                />
            </form>
        )

    }

}