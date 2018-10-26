import React, { Component } from 'react';

import Bindery from 'bindery';
import Controls from 'bindery-controls';

class LayoutPublication extends Component {

    componentDidMount() {

        Bindery.makeBook({ 
          content: '#content',
          pageSetup : {
            size : { width: '4in', height: '6in'},
            margin: { top : '20pt', inner: '12pt', outer : '16pt', bottom: '20pt'},
            // bleed : '12pt',
          },
          ControlsComponent : Controls
        })
      
      }

    render() {

        return <div id='content'>layout</div>

    }


}


export default LayoutPublication;