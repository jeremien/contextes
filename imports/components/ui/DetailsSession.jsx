import React, { Component} from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Sessions } from '../../api/collections/sessions';
import IndexChapitreContainer from '../data/IndexChapitresContainer';
import TableauDeBord from './TableauDeBord';

class DetailsSession extends Component {

    render() {
        if (!this.props.loading && this.props.sessionExists) {

            return (

                <section className='x xw fsc'>

                    {(!!this.props.connecte && this.props.role == "editeur") ?
                        
                        <div id='detailsession--form' className='br py px'>                         

                            <TableauDeBord session={this.props.session} utilisateur={this.props.utilisateur}/> 
                        
                        </div>    
                        :
                        undefined
                    }

                    <div id='detailsession--liste' className='py px'>
                        <IndexChapitreContainer 
                            {...this.props}
                            sessionId={this.props.session._id} 
                            role={this.props.role} 
                            connecte={this.props.connecte} 
                        />
                    </div>

                </section>
            )
        }
        else {
            return <p>chargement de la session</p>
        }
    }
}

export default withTracker((props) => {
    const sessionsHandle = Meteor.subscribe('sessions');
    const loading = !sessionsHandle.ready();
    const session = Sessions.findOne({ _id: props.match.params.sessionId })
    const sessionExists = !loading && !!session
    return {
        loading,
        sessionExists,
        session: sessionExists ? session : []
    }
})(DetailsSession);
