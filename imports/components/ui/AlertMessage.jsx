import React from 'react';

const AlertMessage = (props) => {

    let date = Date.now();

        return (

            <section id='alert'>

                <div className='alert--container bb bcb py px'>

                   { props.alert ? 
                        <span>message de service à {date} : {props.alert}</span> :
                        <span>pas de message</span>
                    } 

                </div>
            </section>

        )
}

export default AlertMessage;