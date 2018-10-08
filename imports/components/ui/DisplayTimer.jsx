import React, { Component } from 'react';

import { Affix, Button, Icon } from 'antd';

const ButtonGroup = Button.Group;

class DisplayTimer extends Component {


    state = {
        buttonType : 'default'
    }

    render() {

        // console.log(this.props)

        return (
            // <div>DisplayTimer : {this.props.chapitre.timer}</div>

            <Affix 
                offsetTop={50} 
                onChange={ affixed => console.log(affixed) 
                }
            >

                <ButtonGroup>

                    <Button
                        size='large'
                        style={{ fontSize: '1.5rem' }}
                        type={this.state.buttonType}
                        onClick={() => this.setState({ buttonType: 'danger' })}
                    >   
                        <Icon type='clock-circle'/> {this.props.chapitre.timer}
                        
                    </Button>

                </ButtonGroup>
              
            </Affix>
        )


    }


}

export default DisplayTimer;