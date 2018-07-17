import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';

import '../stylesheets/layout';
import IndexSession from '../components/IndexSession';
import Login from '../components/Login';
import FullSession from '../components/FullSession';
import TestAPI from '../components/TestAPI';
import Chapitre from '../components/Chapitre';
import AjouterSession from '../components/AjouterSession';

import TableauDeBord from '../components/TableauDeBord';

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