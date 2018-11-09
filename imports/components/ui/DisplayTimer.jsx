import React, { Component } from 'react';

import { Affix, Button, Icon } from 'antd';

const ButtonGroup = Button.Group;

class DisplayTimer extends Component {

    state = {
        buttonType: 'default'
    }

    passerSonTour() {
        if (this.props.onAir) {
            Meteor.call('timer.next')
        }
    }

    render() {

        return (
            <ButtonGroup>

                <Button
                    size='large'
                    style={{ fontSize: '1.5rem' }}
                    type={this.state.buttonType}
                    onClick={() => this.setState({ buttonType: 'danger' }, this.passerSonTour())}
                >
                    <Icon type='clock-circle' /> {this.props.chapitre.timer}

                </Button>

            </ButtonGroup>

        )


    }


}

export default DisplayTimer;