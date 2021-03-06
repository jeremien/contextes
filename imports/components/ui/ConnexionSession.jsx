import React from 'react'
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import DetailsSession from './DetailsSession';

import Modal from 'react-modal';

import { withTracker } from 'meteor/react-meteor-data';

class ConnexionSession extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            essai: false,
            password: '',
            isInSession: false,
            modalIsOpen : true
        };
        this.handlePassword = this.handlePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // componentDidMount() {
    //     this.setState({isInSession: Roles.userIsInRole('admis', this.props.match.params.sessionId)})
    // }

    handleSubmit() {
        // this.setState({ essai: false })
        console.log('submit')
        Meteor.call('sessions.connexion', Meteor.userId(), this.props.match.params.sessionId, this.state.password, function (error, result) {
        //    alert('error', error)
            // alert('result', result)
            if (!result) {
                // this.setState({ essai: true, password: '', })
            } else {
                this.setState({
                    modalIsOpen : false
                })
            }
        })
    }

    handlePassword(e) {
        e.preventDefault()
        this.setState({ password: e.target.value })
    }

    render() {
        if (this.props.autorise) {
            return (
                <DetailsSession {...this.props} />
            )
        }
        else {
            return (
                <div className='login--container'>

                <Modal 
                
                    isOpen={true}
                    ariaHideApp={false}
                    className='login--modal'
                    overlayClassName='login--overlay'
                
                >   
                    <form className='login--form' onSubmit={this.handleSubmit}>

                        <label>
                            Mot de passe
                            <input type='password' name='password' value={this.state.password} onChange={this.handlePassword}/>
                        </label>

                   

                        <label>
                        <input type='submit' value='connexion' />
                        </label>

                    </form>

                </Modal>
             
            </div>
            )
        }

    }
}

export default withTracker((props) => {
    const autorise = !!(Roles.userIsInRole(Meteor.user(), 'admis', props.match.params.sessionId))
    // const autorise = false
    return { autorise: autorise }
})(ConnexionSession)