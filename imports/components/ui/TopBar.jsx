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

  dataFilterChapitres(sessionId) {
    const chaps = this.props.chapitres.filter((item) => {
            return item.session === sessionId;
        });

    const openChaps = chaps.filter((item) => {
            return item.isOpen === true;
    });

    return openChaps.map((item) => {
        return <li key={item._id}><Link to={`/session/${sessionId}/chapitre/${item._id}`}>{item.titre}</Link></li>
    });
  }

  renderSessions() {
    return this.props.sessions.map((item) => {
      return (
          <li className='lk crs' key={item._id} onClick={() => {
                this.setState({ showMenu : false });
              }
            }
          >
          <Link to={`/sessions/${item._id}`}>
            {item.titre}
            </Link>

              <ol className="menu--chapitres">
                { this.dataFilterChapitres(item._id) }
              </ol>

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
            case 'lecteur':
                role = 'lecteur.rice'
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
        // <header id='topbar' >
            <div className='topbar--container fsc'>
                <div className='topbar--menu bb br bcb py px crs' onClick={() => this.setState({ showMenu : !showMenu})}>
                    { showMenu ? 'Fermer' : 'Menu'}
                </div>

                { showMenu ?  <ul id='menu' className='bg br bcb px py active'>                    
                    

                                    { this.props.connecte ? <li className='lk crs' onClick={() => {
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
                          
                                            // if (this.props.role == 'editeur') {
                                            //   Meteor.call('deconnexion.editeur');
                                            // }
                
                                            this.setState({ showMenu : false });
                                            this.props.history.push(`/login`);
                                          }
                                        }> Déconnexion </li> 
                                        : 
                                        <Link to={'/login'} onClick={() => this.setState({ showMenu : false })}>Connection</Link> 
                                    }

                                    <li className='lk crs' onClick={() => {
                                      this.props.history.push(`/`);
                                      this.setState({ showMenu : false });
                                    }

                                    }>Accueil</li>

                                    <li className='lk crs' onClick={() => {
                                      this.props.history.push(`/sessions`);
                                      this.setState({ showMenu : false });
                                    }
                                      
                                      }>Sessions</li>
                                      <ul className="menu--sessions">
                                        { this.renderSessions() }
                                      </ul>
 
                                </ul> 
                                
                          : undefined
                }
                
                <div className='topbar--info bb br bcb py px crs' onClick={() => this.setState({ showRole : !showRole})}>

                    { showRole ? 'Fermer' : `${text}`}
                    
                </div>

                { 
                  showRole ?  <ul id='role' className='bg br bb bl bcb py px active'>
                    
                            <li className='crs lk' onClick={() => this.handleRole('editeur')}>éditeur.rice</li>
                            <li className='crs lk' onClick={() => this.handleRole('transcripteur')}>transcripteur.rice</li>
                            <li className='crs lk' onClick={() => this.handleRole('correcteur')}>correcteur.rice</li>
                            <li className='crs lk' onClick={() => this.handleRole('iconographe')}>iconographe</li>
                            <li className='crs lk' onClick={() => this.handleRole('lecteur')}>lecteur.rice</li>
                        
                        </ul> 
                    
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
        // </header>
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
