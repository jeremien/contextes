import React from 'react';

import { Breadcrumb } from 'antd';

class FilAriane extends React.Component {

    render() {

        // console.log(this.props)

        return (

            <Breadcrumb style={{ margin : '16px 0'}}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Sessions</Breadcrumb.Item>
            </Breadcrumb>
    
        )
    }
}

export default FilAriane;