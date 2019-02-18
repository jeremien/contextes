import React, { Component } from 'react'
import { Menu, Icon, Select } from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class TopBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      current: 'home',
      role: '',
    }

    this.handClickMenu = this.handClickMenu.bind(this);
    this.handleRole = this.handleRole.bind(this)

  }

  componentDidMount() {
    this.props.role && this.setState({ role: this.props.role })
  }

  handClickMenu(e) {
    if (e.key === 'home') {
      this.props.history.push(`/`);
      this.setState({
        current: 'home'
      })
    } 
    
    else if (e.key == 'role') {

    }
    else {
      this.props.history.push(`/${e.key}`);
      this.setState({
        current: e.key
      })
    }
  }

  handleRole(role) {
    this.setState({ role: role })
    Meteor.call('connexions.role', this.props.userId, role)
  }

  renderSessions() {
    return this.props.sessions.map((item, key) => {
      return (
        <MenuItemGroup key={key}>
          <Menu.Item key={`sessions/${item._id}`}>{item.titre}</Menu.Item>
        </MenuItemGroup>
      )
    })
  }

  renderChapitres() {
    return this.props.chapitres.map((item, key) => {
      return (
        <MenuItemGroup key={key}>
          <Menu.Item key={`session/${item.session}/chapitre/${item._id}`}>{item.titre}</Menu.Item>
        </MenuItemGroup>
      )
    })

  }


  renderPublications() {
    return this.props.publications.map((item, key) => {
      return (
        <MenuItemGroup key={key}>
          <Menu.Item key={`publication/${item._id}`}>{item.titre}</Menu.Item>
        </MenuItemGroup>
      )
    })

  }

  render() {

    let text = `Bienvenue, ${this.props.utilisateur}. Vous êtes un ${this.props.role}`;

    if (!this.props.loading) {

      return (
        <div>

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


            {!this.props.connecte ?
              <Menu.Item
                key='login'
              >Login</Menu.Item> :
              <Menu.Item
                key='login'
                onClick={() => {
                  console.log('logout')
                  Meteor.call('connexions.remove', this.props.userId);
                  /**
                   * Logout version web. A commenter si serveur local
                   */
                  Meteor.logout(function (error) {
                    if (error) {
                      console.log('erreur logout :', error)
                    } else {
                      console.log('logout');
                    }
                  })

                  localStorage.clear();
                  Session.clear()

                  if (this.props.role == 'editeur') {
                    Meteor.call('deconnexion.editeur')
                  }


                }
                }
              > Logout ({text})</Menu.Item>
            }

            {this.props.connecte &&
              <Menu.Item
                key='role'
              >
                <Select
                  defaultValue={this.props.role}
                  placeHolder="Choisissez un nouveau role"
                  style={{ width: 200 }}
                  onChange={this.handleRole}
                >
                  <Select.Option value='editeur'>Éditeur</Select.Option>
                  <Select.Option value='transcripteur'>Transcripteur</Select.Option>
                  <Select.Option value='correcteur'>Correcteur</Select.Option>
                  <Select.Option value='iconographe'>Iconographe</Select.Option>

                </Select>
              </Menu.Item>
            }
          </Menu>
        </div>
      )



    } else {
      return <div>chargement</div>
    }
  }
}
