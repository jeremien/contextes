import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';

import '../stylesheets/layout';

export default class MainLayout extends React.Component {
    render() {
        return(
            <div className="main">
                <div className="topbar">
                {this.props.topbar}
                </div>
                <div className="body">
                    {this.props.children}
                </div>
            </div>

        )
    }
}