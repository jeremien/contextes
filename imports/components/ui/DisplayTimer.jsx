import React, { Component } from 'react';

import { Button, Icon } from 'antd';

const ButtonGroup = Button.Group;

class DisplayTimer extends Component {


    state = {
        buttonType: 'default'
    }

    passerSonTour() {
        if (this.props.onAir) {
            Meteor.call('timer.next')
        }

        let infos = {
            title: `message de ${this.props.utilisateur}, transcripteur`,
            message: `${this.props.utilisateur} passe son tour`,
            type: "warning"
        }

        Meteor.call('notification', infos);
        Meteor.call('log.insert', 'notification', infos.message );
    }

    render() {

        console.log(this.props)

        return (
            <ButtonGroup>

                <Button
                    size='large'
                    style={{ fontSize: '1.5rem' }}
                    type={this.state.buttonType}
                    onClick={() => this.passerSonTour()}
                >
                    <Icon type='clock-circle' /> {this.props.chapitre.timer}

                </Button>

            </ButtonGroup>

        )


    }


}

export default DisplayTimer;