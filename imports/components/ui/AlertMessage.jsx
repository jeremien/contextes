import React from 'react';

import Moment from 'react-moment';

const AlertMessage = (props) => {

        return (

            <section id='alert'>

                <div className='alert--container bb bcb py px'>

                   { props.alert ? 
                        <span className='cff'>À <Moment format='HH:mm'>{Date.now()}</Moment>, {props.alert.titre} dit <span className='cfb'>{props.alert.message}</span> </span> :
                        <span className='cff'>pas de message</span>
                    } 

                </div>
            </section>

        )
}

export default AlertMessage;