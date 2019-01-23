import React from 'react';
import flvjs from 'flv.js'
import { Meteor } from 'meteor/meteor'

export default class Stream extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.flvPlayer;
        this.state = {
            montrerLien: false,
            ip: 'localhost',
        }

    }

    componentDidMount() {
        Meteor.call('getIp', (error, result) => {
            // this.setState({ip: ip})
            console.log('result :', result)
            this.setState({ip: result})
            if (flvjs.isSupported()) {
                console.log("supported")
                var videoElement = document.getElementById('videoElement');
                this.flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    url: `ws://${result}:8000/live/${this.props.chapitre}.flv`,
                },
                    {
                        enableStashBuffer: false,
                    });
                this.flvPlayer.attachMediaElement(videoElement);
                this.flvPlayer.load();
                this.flvPlayer.play();
                this.flvPlayer.on(flvjs.Events.MEDIA_INFO, (metadata) => this.setState({ montrerLien: true }));
            }
        })

    }

    render() {
        return (
            <div>
                <video id="videoElement" width="320" height="240" autoPlay controls poster='https://cdn-images-1.medium.com/max/800/0*4Gzjgh9Y7Gu8KEtZ.gif'></video>
                {!this.state.montrerLien &&
                    <p>Aucun stream disponible pour ce chapitre.</p>}
                <p>Pour démarrer un live vidéo :
                    <br />
                    <h3>Avec ffmpeg</h3>dans un terminal <code>ffmpeg -re -i INPUT_FILE_NAME -c copy -f flv rtmp://{`${this.state.ip}`}/live/{`${this.props.chapitre}`}</code>
                    <br />
                    <h3>Avec OBS</h3>Stream Type : Custom Streaming Server
                         <br />
                    URL : rtmp://{this.state.ip}/live
                        <br />
                    Stream key : {`${this.props.chapitre}`}
                </p>

            </div>
        )
    }
}