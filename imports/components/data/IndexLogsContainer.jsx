import React from 'react';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import { Logs } from '../../api/collections/logs'

import IndexLogs from '../ui/IndexLogs';

class IndexLogsContainer extends React.Component {

    render() {

        // console.log(this.props)

        return <IndexLogs {...this.props} />

    }

}

export default IndexLogsContainer = withTracker((props) => {
    const logsHandle = Meteor.subscribe('logs');
    const loading = !logsHandle.ready();
    const logs = Logs.find().fetch();
    const logsExists = !loading && !!logs;

    return {
        loading,
        logsExists,
        logs : logsExists ? logs : []
    }

})(IndexLogsContainer);