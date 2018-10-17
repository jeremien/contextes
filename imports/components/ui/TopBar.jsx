import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'

import { Menu, Icon } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class TopBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      current : 'home'
    }

    this.handClickMenu = this.handClickMenu.bind(this);

  }

  handClickMenu(e) {
    // console.log(e.key)
    if (e.key === 'home') {
      this.props.history.push(`/`);
    } else {
      this.props.history.push(`/${e.key}`);
    }
  }


  renderSessions() {
    return this.props.sessions.map((item, key) => {
      // console.log(item)
      return (
        <MenuItemGroup key={key}>
          <Menu.Item key={`sessions/${item._id}`}>{item.titre}</Menu.Item>
        </MenuItemGroup>
      )
    })
  }

  renderChapitres() {

    return this.props.chapitres.map((item, key) => {
      // console.log(item)
      return (
        <MenuItemGroup key={key}>
          <Menu.Item key={`session/${item.session}/chapitre/${item._id}`}>{item.titre}</Menu.Item>
        </MenuItemGroup>
      )
    })

  }


  renderPublications() {
    return (
      <MenuItemGroup key={`publications`}>
        <Menu.Item key={`publications`}>{`publication`}</Menu.Item>
      </MenuItemGroup>
    )
  }

  render() {  

    let text = `Bienvenue, ${this.props.utilisateur}. Vous êtes un ${this.props.role}`;

    // console.log(this.props)

    if (!this.props.loading) {

      return (
      
        <Menu
          mode='horizontal'
          selectedKeys={[this.state.current]}
          onClick={this.handClickMenu}
        > 
          

            <Menu.Item key='home'>
              <Icon type="home" />
            </Menu.Item>
          
          {this.props.connecte &&
            <SubMenu
              key='sessions'
              title='Sessions'
              onTitleClick={this.handClickMenu}
            >
              {this.renderSessions()}
    
            </SubMenu>
          }

          {this.props.connecte &&
            <SubMenu
              key='chapitres'
              title='Chapitres'
              onTitleClick={this.handClickMenu}
            >
              {this.renderChapitres()}
    
            </SubMenu>
          }

            <SubMenu
              key='publications'
              title='Publications'
              onTitleClick={this.handClickMenu}
            >
              {this.renderPublications()}
    
            </SubMenu>
          

          {!this.props.connecte ? 
            <Menu.Item 
              key='login'
            >Login</Menu.Item> :  
            <Menu.Item 
              key='login' 
              onClick={() => {
                console.log('logout')
                localStorage.clear();
                Session.clear()
                
                Meteor.call('connexions.remove', this.props.userId);
                  if (this.props.role == 'editeur') {
                    Meteor.call('deconnexion.editeur')
                  }
                
                let infos = {
                  title : "message général",
                  message : `déconnexion de ${this.props.utilisateur} comme ${this.props.role}`,
                  type : "info"
                };
        
                Meteor.call('notification', infos);
                
                // this.props.history.push('/login');
  
                }
              }
            > Logout ({text})</Menu.Item> 
          }
          
        </Menu>
  
      )
    } else {
      return <div>chargement</div>
    }


  }

   
}

// const LogOut = (props) => {
//   return (
//     <Button
//       text="Se déconnecter"
//       colorScheme="primary"
//       size="small"
//       onPress={() => {
//         console.log('click')
//         localStorage.clear();
//         Session.clear()
//         Meteor.call('connexions.remove', props.userId);
//         if (props.role == 'editeur') {
//           Meteor.call('deconnexion.editeur')
//         }
//         props.history.push('/');
//       }}
//     />
      
//   )
// }
