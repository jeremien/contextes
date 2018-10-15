import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'

import { Menu, Button } from 'antd';

export default class TopBar extends Component {

  constructor(props) {
    super(props);
  }

//   componentDidMount() {
//     // console.log('mount',this.props)

//     if (this.props.connecte) {
//         console.log('mount', 'connecte')
//         this.props.history.push('/sessions')
//     } else {
//         console.log('mount','non connecte')
//         this.props.history.push('/login')
//     }
// }

// componentDidUpdate() {
    
//     console.log('update', this.props)

//     if (this.props.connecte) {
//         console.log('update','connecte')
//     } else {
//         console.log('update','non connecte')
//         this.props.history.push('/login')
//     }

// }

  render() {  

    // console.log(this.state)

    let text = `Bienvenue, ${this.props.utilisateur}. Vous êtes un ${this.props.role}`;

    return (
      // <div>top</div>

      
      <Menu
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '64px' }}
      > 

        <Menu.Item key='1'><Link to={'/'}>Home</Link></Menu.Item>
        <Menu.Item key='2'><Link to={'/sessions'}>Sessions</Link></Menu.Item>
        {/* <Menu.Item key='3'>Chapitres</Menu.Item> */}
        <Menu.Item key='3'><Link to={'/publications'}>Publications</Link></Menu.Item>

        {!this.props.connecte ? 
          <Menu.Item 
            key='4'
          > <Link to={'/login'}>Login</Link></Menu.Item> :  
          <Menu.Item 
            key='4' 
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
              
              this.props.history.push('/login');

              }
            }
          > Logout ({text})</Menu.Item> 
        }

        {/* <Menu.Item 
          key='5'
          onClick={() => this.setState({ visibleInfo : true })}
        >test</Menu.Item> */}
        

        

      </Menu>

      // <Navigation>

      //   <List>

      //     <li>
      //       <Link to={'/sessions'}>Index des Sessions</Link>
      //     </li>

      //     {!!this.props.connecte ? 
      //       <Button>Logout</Button> :
      //       <li>
      //       <Link to={'/login'}>Login</Link>
      //     </li>
      //     }

      //   </List>


      // </Navigation>




      // <Header
      //   mode="fixed"
      //   backgroundColor="lightgrey"
      // >
      //   <Menu inline colorScheme="dark">
      //     <MenuGroup>
            
      //       <MenuList> 

      //         <MenuItem 
      //           text="Index des Sessions" 
      //           onClick={()=> this.props.history.push('/sessions')} 
      //         />

      //         {!!this.props.connecte ? 
                
      //           // <span>Bienvenue, {this.props.utilisateur}. Vous êtes {this.props.role} <LogOut {...this.props} /> </span> 
      //           <MenuItem 
      //             text="Se déconnecter"
      //             textSecondary={text}
      //             onClick={() => {
      //               console.log('clik')
      //               localStorage.clear();
      //               Session.clear()
      //               Meteor.call('connexions.remove', this.props.userId);
      //               if (this.props.role == 'editeur') {
      //                 Meteor.call('deconnexion.editeur')
      //               }
      //               this.props.history.push('/login');
      //             }}
      //           />
                
      //           :

      //           <MenuItem 
      //             text="Login"
      //             onClick={()=> this.props.history.push('/login')} 
      //           />
                
      //         }

      //       </MenuList>
          
      //     </MenuGroup>
        
      //   </Menu>
      // </Header>

      
    )
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
