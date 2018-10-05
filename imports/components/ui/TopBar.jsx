import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom'

import Appbar from 'muicss/lib/react/appbar';
import Button from 'muicss/lib/react/button';

export default class TopBar extends Component {

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

    let s1 = { verticalAlign: 'middle'}
    let s2 = { textAlign: 'right'}

    return (

      <Appbar>

        <table width="100%" className="mui--text-dark">
          <tbody>
            <tr style={s1}>
              <td className="mui--appbar--height">
                 <Link to="/sessions"> Index des Sessions </Link>
              </td>
              {!!this.props.connecte ?
              <td className="mui--appbar--height" style={s2}>
                  Bienvenue, {this.props.utilisateur}. Vous êtes {this.props.role}
                   <LogOut {...this.props} />
              </td> :
               <td className="mui--appbar--height" style={s2}>
                <Link to="/login">Login</Link>
              </td>}
            </tr>
          </tbody>
        
        </table>



        {/* <ul className="mui-list--unstyled">
        <li className="topbar--titre"> <Link to="/sessions"> Index des Sessions </Link> </li>
        
        {!!this.props.connecte ?

          <li className="topbar--logout">
            
            Bienvenue, {this.props.utilisateur}. Vous êtes {this.props.role}
            
            <LogOut {...this.props} />

          </li>
          :
          <li className="topbar--login">
            <Link to="/login">Login</Link>
          </li>
        }
        </ul>  */}

      </Appbar>
    )
  }
}

const LogOut = (props) => {
  return (
    <Button
      type='button'
      onClick={() => {
        localStorage.clear();
        Session.clear()
        Meteor.call('connexions.remove', props.userId);
        if (props.role == 'editeur') {
          Meteor.call('deconnexion.editeur')
        }
        props.history.push('/');
      }}
    >
      Se déconnecter
      </Button>
  )
}
