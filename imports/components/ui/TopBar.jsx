import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ChatBox from './Chatbox';
export default class TopBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      role: '',
      showMenu : false,
      showChatbox : false,
      showRole : false
    }

    this.handleRole = this.handleRole.bind(this)

  }

  componentDidMount() {
    this.props.role && this.setState({ role: this.props.role });
  }


  handleRole(role) {
    this.setState({ role, showRole : false });
    Meteor.call('connexions.role', this.props.userId, role);
  }

  renderSessions() {
    return this.props.sessions.map((item, key) => {
      return (
          <li className='lk crs' key={item._id} onClick={() => {
              this.props.history.push(`/sessions/${item._id}`);
              this.setState({ showMenu : false });
              }
            }
          >
            {item.titre}
          </li>
      )
    });
  }

  render() {

    let { showMenu, showChatbox, showRole } = this.state;

    let text, role;

    if (this.props.connecte) {

        switch (this.props.role) {
            case 'editeur':
                role = 'editeur.rice';
                break;
            case 'transcripteur':
                role = 'transcripteur.rice'
                break;
            case 'correcteur':
                role = 'correcteur.rice'
                break;
            case 'iconographe':
                role = 'iconographe'
                break;
            default:
                role = ''
        }

        text = `${this.props.utilisateur}, ${role}`;
    } else {
        text = `vous n'êtes pas connecté.e`
    }


    if (!this.props.loading) {

      return (
        <header id='topbar' >
            <div className='topbar--container fsc'>
                <div className='topbar--menu bb br bcb py px crs' onClick={() => this.setState({ showMenu : !showMenu})}>
                    { showMenu ? 'Fermer' : 'Menu'}
                </div>

                { showMenu ?  <aside id='menu' className='bg br bcb py px active'>                    
                    

                                    { this.props.connecte ? <p className='lk crs' onClick={() => {
                                            console.log('logout')
                                            Meteor.call('connexions.remove', this.props.userId);
                                        
                                            Meteor.logout(function (error) {
                                              if (error) {
                                                console.log('erreur logout :', error)
                                              } else {
                                                console.log('logout');
                                              }
                                            })
                          
                                            localStorage.clear();
                                            Session.clear();
                          
                                            if (this.props.role == 'editeur') {
                                              Meteor.call('deconnexion.editeur');
                                            }
                
                                            this.setState({ showMenu : false });
                                            this.props.history.push(`/login`);
                                          }
                                        }> Déconnexion </p> 
                                        : 
                                        <Link to={'/login'} onClick={() => this.setState({ showMenu : false })}>Connection</Link> 
                                    }

                                    <p className='lk crs' onClick={() => {
                                      this.props.history.push(`/`);
                                      this.setState({ showMenu : false });
                                    }

                                    }>Accueil</p>

                                    <p className='lk crs' onClick={() => {
                                      this.props.history.push(`/sessions`);
                                      this.setState({ showMenu : false });
                                    }
                                      
                                      }>Sessions</p>
                
                                        { this.renderSessions() }
 
                                </aside> 
                                
                          : undefined
                }
                
                <div className='topbar--info bb br bcb py px crs' onClick={() => this.setState({ showRole : !showRole})}>

                    { showRole ? 'Fermer' : `${text}`}
                    
                </div>

                { 
                  showRole ?  <aside id='role' className='bg br bb bl bcb py px active'>
                    
                                    <p className='crs lk' onClick={() => this.handleRole('editeur')}>éditeur.rice</p>
                                    <p className='crs lk' onClick={() => this.handleRole('transcripteur')}>transcripteur.rice</p>
                                    <p className='crs lk' onClick={() => this.handleRole('correcteur')}>correcteur.rice</p>
                                    <p className='crs lk' onClick={() => this.handleRole('iconographe')}>iconographe</p>
                                
                                </aside> 
                            
                            : undefined

                }

               

                <div className='topbar--chatbox bb bcb py px crs' onClick={() => this.setState({ showChatbox : !showChatbox})}>
                   { showChatbox ? 'Fermer' : 'Conversation' } 
                </div>
                
                { 
                  showChatbox ? <aside id='chatbox' className='bg bl bcb py px active'>
                                  <ChatBox {...this.props} />
                                </aside> 
                              
                              : undefined
                }
               
            </div>
           
        </header>
      )

    } else {
      return (
        <div id='topbar'>
            <div className='topbar--container topbar--loading fsc bb bcb py px '>chargement</div>
        </div>
      )
    }
  }
}
