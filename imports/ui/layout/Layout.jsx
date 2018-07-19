import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';

import '../stylesheets/layout';

// export default class Layout extends React.Component {
//     render() {
//         return (
//             <div className="main">
//                 <div className="topbar">
//                     {this.props.topbar}
//                 </div>
//                 <div className="body">
//                     {this.props.children}
//                 </div>
//             </div>

//         )
//     }
// }

const Layout = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={matchProps => (
            <div className="Layout">
                <div className="Outils">Outils</div>
                <div className="coprs">
                    <Component {...matchProps} />
                </div>
            </div>
        )} />
    )
};

export default Layout