import React from 'react';
import { Player, ControlBar } from 'video-react';
import { Meteor } from 'meteor/meteor'
// import ReactPlayer from 'react-player'
import Hls from 'hls.js'
import ReactHLS from 'react-hls';

import { Switch } from 'antd'

export default class Stream extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.flvPlayer;
        this.state = {
            montrerLien: true,
            ip: '',
        }
    }

    componentDidMount() {
        Meteor.call('getIp', (error, result) => {
            console.log('result :', result)
            this.setState({ ip: result })
        })
    }

    render() {

        if (this.state.ip) {
            return (
                <div>
                    <div>
                        <Player
                            ref="player"
                            autoPlay>
                            <HLSSource
                                isVideoChild
                                src={`http://${this.state.ip}:3002/live/${this.props.chapitre}/index.m3u8`}
                            />
                            <ControlBar autoHide={false} />
                        </Player>
                    </div>
                    <Switch
                        defaultChecked={this.state.montrerLien}
                        onChange={() => { this.setState({ montrerLien: !this.state.montrerLien }) }}
                        style={{ marginBottom: '20px' }}
                    /><i>Montrer les instructions de stream</i>
                    {
                        this.state.montrerLien &&
                        <div>
                            <p>Aucun stream disponible pour ce chapitre.</p>
                            <p>Pour démarrer un live vidéo :</p>
                            <br />
                            <h3>Avec ffmpeg</h3>dans un terminal
                    <p>Pour une vidéo en H.264 video et AAC audio :</p>
                            <code>ffmpeg -re -i INPUT_FILE_NAME -c copy -f flv rtmp://{`${this.state.ip}`}/live/{`${this.props.chapitre}`}</code>
                            <br />
                            <p>Pour une vidéo en H.264 video et AAC audio :</p>
                            <code>ffmpeg -re -i INPUT_FILE_NAME -c:v libx264 -preset superfast -tune zerolatency -c:a aac -ar 44100 -f flv  rtmp://{`${this.state.ip}`}/live/{`${this.props.chapitre}`}</code>
                            <br />
                            <h3>Avec OBS</h3><p>Stream Type : Custom Streaming Server
                         <br />
                                URL : rtmp://{this.state.ip}/live
                        <br />
                                Stream key : {`${this.props.chapitre}`}
                            </p>
                        </div>
                    }
                </div >
            )
        }
        else {
            return (
                <h3>En attente de l'ip du serveur</h3>
            )
        }
    }
}




class HLSSource extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.hls = new Hls();
    }

    componentDidMount() {
        // `src` is the property get from this component
        // `video` is the property insert from `Video` component
        // `video` is the html5 video element
        const { src, video } = this.props;
        // load hls video source base on hls.js
        if (Hls.isSupported()) {
            this.hls.loadSource(src);
            this.hls.attachMedia(video);
            this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play();
            });
        }
    }


    componentWillUnmount() {
        // destroy hls video source
        if (this.hls) {
            this.hls.destroy();
        }
    }

    render() {
        return (
            <source
                src="http://localhost/live/test/index.m3u8"
                type={this.props.type || 'application/x-mpegURL'}
            />
        );
    }
}