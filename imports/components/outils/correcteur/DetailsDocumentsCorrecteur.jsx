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

        console.log(this.props)

        let { contenu } = this.state;

        return (
            <div className='detailsdocuments'>
                <textarea
                    className='wfull txta px py mxa btt'
                    // cols='50'
                    // rows='10'
                    value={contenu}
                    onChange={this.handleChange}
                />
            </div>
        )

    }

}