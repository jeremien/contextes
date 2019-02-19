import React, { Component, PropTypes } from 'react';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Connexions } from '../../api/collections/connexions'
import { Accounts } from 'meteor/accounts-base'

import Modal from 'react-modal';
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            role: Session.get('role') || 'editeur',
            inscription: false,
            modalIsOpen : true
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleRoleChange = this.handleRoleChange.bind(this)
        this.connexion = this.connexion.bind(this)
        this.handleConnectionChange = this.handleConnectionChange.bind(this);
    }

    connexion() {

        const { username, role, socketId } = { username: this.state.username, role: this.state.role, socketId: this.props.socketId }
        
        Meteor.loginWithPassword(username, this.state.password, function (error) {

            if (error) {
                console.log("erreur connexion :", error);
            } else {
                console.log(Meteor.userId(), username, role, socketId)
                console.log("connexion réussie")
                Meteor.call('connexions.insert.local', Meteor.userId(),username, role, socketId, function (error) {
                    if (error) {
                        alert('Erreur à la connection', error);
                    } else {
                        // alert('Vous êtes connecté');
                    }
                });
            }
            
        });

        let infos = {
            titre: this.state.username,
            message: `je suis connecté.e comme ${this.state.role}`
        };

        Meteor.call('notification', infos);

        if (this.props.history) {
            this.props.history.push('/sessions');
        }
    }

    handleSubmit(event) {


        event.preventDefault();
        const self = this;
        //Controle du remplissage des champs
        if (!!this.state.username && !!this.state.role) {
            //Chontrole choix entre inscription et connexion
            if (this.state.inscription) {
                const { username } = { username: this.state.username, role: this.state.role, socketId: this.props.socketId }
                Accounts.createUser({ username: username, password: this.state.password, email: this.state.email }, function (error) {
                    if (error) {
                        alert(error);
                    }
                    else {
                        self.connexion();

                    }
                })
            }

            else {
                console.log('connection en cours')
                this.connexion();
            }
        }
        else {
            alert("indiquer un nom d'utilisateur et/ou un role")
        }
    }

    handleRoleChange(e) {
        console.log(e.target.value)
        this.setState({ role: e.target.value });

    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleConnectionChange() {
        this.setState({ inscription : !this.state.inscription })
    }

    render() {

        const { inscription, role } = this.state;

        return (
            <div className='login--container'>

                <Modal 
                
                    isOpen={true}
                    ariaHideApp={false}
                    className='login--modal'
                    overlayClassName='login--overlay'
                
                >   
                    {/* { inscription ? <p>inscription</p> : <p>connexion</p>} */}

                    <form className='login--form' onSubmit={this.handleSubmit}>

                        <label>
                            <select name="connection" value={inscription} onChange={this.handleConnectionChange}>
                                <option value={true}>inscription</option>
                                <option value={false}>connection</option>
                            </select>
                        </label>

                        <label>
                            Nom
                            <input type='text' name='username' onChange={this.handleInputChange}/>
                        </label>

                        <label>
                            Mot de passe
                            <input type='password' name='password' onChange={this.handleInputChange}/>
                        </label>

                        { inscription && 
                              <label>
                                Email
                                <input type='email' name='email' onChange={this.handleInputChange}/>
                              </label>
                        }

                        <label>
                            Rôle
                            <select name="role" value={role} onChange={this.handleRoleChange}>
                                <option value='editeur'>éditeur</option>
                                <option value='transcripteur'>transcripteur</option>
                                <option value='correcteur'>correcteur</option>
                                <option value='iconographe'>iconographe</option>
                            </select>
                        </label>

                        <label>
                        <input type='submit' value='connexion' />
                        </label>

                    </form>

                </Modal>
             
            </div>

        );
    }
}

export default withTracker((props) => {
    const connexionsHandle = Meteor.subscribe('connexions');
    const loading = !connexionsHandle.ready();
    const editeur = Connexions.find({ role: 'editeur' })
    const transcripteurs = Connexions.find({ role: 'transcripteur' })
    const editeurExists = !loading && !!editeur;
    const transcripteursExists = !loading && !!transcripteurs
    return {
        loading,
        editeurExists,
        transcripteursExists,
        editeur: editeurExists ? editeur.fetch() : [{}],
        transcripteurs: transcripteursExists ? transcripteurs.fetch() : [{}]
    }
})(Login);