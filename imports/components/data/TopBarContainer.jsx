import React from 'react';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'

import { Sessions } from '../../api/collections/sessions';
import { Chapitres } from '../../api/collections/chapitres';
import { Publications } from '../../api/collections/publication';

import TopBar from '../ui/TopBar';
// import FilAriane from '../ui/FilAriane';

class TopBarContainer extends React.Component {


    render() {
        return (
            <div>
                <TopBar {...this.props} />
                {/* <FilAriane {...this.props} /> */}
            </div>
            
        )

    }

}

export default withTracker(() => {
    const sessionsHandle = Meteor.subscribe('sessions');
    const chapitresHandle = Meteor.subscribe('chapitres');
    const publicationsHandle = Meteor.subscribe('publications');
    const loading = !sessionsHandle.ready() && !chapitresHandle.ready() && !publicationsHandle.ready();
    const sessions = Sessions.find({}).fetch();
    const chapitres = Chapitres.find({}).fetch();
    const publications = Publications.find({}).fetch();
    const sessionsExists = !loading && !!sessions;
    const chapitresExists = !loading && !!chapitres;
    const publicationsExists = !loading && !!publications;

    return {
        loading,
        sessionsExists,
        chapitresExists,
        publicationsExists,
        sessions: sessionsExists ? sessions : [{}],
        chapitres: chapitresExists ? chapitres : [{}],
        publications : publicationsExists ? publications : [{}]
    }
})(TopBarContainer);