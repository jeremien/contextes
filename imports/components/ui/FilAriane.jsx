import React from 'react';
import { Link } from 'react-router-dom';

import { Breadcrumb } from 'antd';
import { Object } from 'core-js';

class FilAriane extends React.Component {


    renderBreadcrumb() {

        // console.log(pathTab.length)

        // if (pathTab.length === 0) {

        //     return ( 
        //         <Breadcrumb style={{ margin : '20px 0'}}>
        //             <Breadcrumb.Item>Home</Breadcrumb.Item>
        //         </Breadcrumb>
        //     )
        
        // } else if (pathTab[0] === 'sessions' && pathTab.length === 0) {
        
        //     return ( 
        //         <Breadcrumb style={{ margin : '20px 0'}}>
        //             <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
        //             <Breadcrumb.Item>Sessions</Breadcrumb.Item>
        //         </Breadcrumb>
        //     )
        // } else if (pathTab[0] === 'chapitres' && pathTab.length === 0) {
        
        //     return ( 
        //         <Breadcrumb style={{ margin : '20px 0'}}>
        //             <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
        //             <Breadcrumb.Item><Link to='/sessions'>Sessions</Link></Breadcrumb.Item>
        //             <Breadcrumb.Item>Chapitres</Breadcrumb.Item>
        //         </Breadcrumb>
        //     )
        // } else {

        //     return (
        //         <Breadcrumb style={{ margin : '20px 0'}}>
        //             <Breadcrumb.Item><Link to='/'>Home</Link></Breadcrumb.Item>
                    
        //             {pathTab.map((item, key) => {
        //                 return <Breadcrumb.Item key={key}>{item}</Breadcrumb.Item>
        //             })}

        //         </Breadcrumb>
        //     )
        // }
    }


    render() {

        // const { location } = this.props;
        // const pathTab = location.pathname.split('/').filter(i => i);

        return <div>{this.renderBreadcrumb()}</div>

  
    }
}

export default FilAriane;