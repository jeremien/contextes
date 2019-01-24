import React from 'react';
import { Player, ControlBar } from 'video-react';
import { Meteor } from 'meteor/meteor'
// import ReactPlayer from 'react-player'
import Hls from 'hls.js'
import ReactHLS from 'react-hls';

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



// render() {
//     return (
//         <div>
//             <Player
//                 ref="player"
//                 autoPlay
//             >
//                 <source src={this.state.source} />
//                 <ControlBar autoHide={false} />
//             </Player>
//             <div className="py-3">
//                 <Button onClick={this.play} className="mr-3">play()</Button>
//                 <Button onClick={this.pause} className="mr-3">pause()</Button>
//                 <Button onClick={this.load} className="mr-3">load()</Button>
//             </div>
//             <div className="pb-3">
//                 <Button onClick={this.changeCurrentTime(10)} className="mr-3">currentTime += 10</Button>
//                 <Button onClick={this.changeCurrentTime(-10)} className="mr-3">currentTime -= 10</Button>
//                 <Button onClick={this.seek(50)} className="mr-3">currentTime = 50</Button>
//             </div>
//             <div className="pb-3">
//                 <Button onClick={this.changePlaybackRateRate(1)} className="mr-3">playbackRate++</Button>
//                 <Button onClick={this.changePlaybackRateRate(-1)} className="mr-3">playbackRate--</Button>
//                 <Button onClick={this.changePlaybackRateRate(0.1)} className="mr-3">playbackRate+=0.1</Button>
//                 <Button onClick={this.changePlaybackRateRate(-0.1)} className="mr-3">playbackRate-=0.1</Button>
//             </div>
//             <div className="pb-3">
//                 <Button onClick={this.changeVolume(0.1)} className="mr-3">volume+=0.1</Button>
//                 <Button onClick={this.changeVolume(-0.1)} className="mr-3">volume-=0.1</Button>
//                 <Button onClick={this.setMuted(true)} className="mr-3">muted=true</Button>
//                 <Button onClick={this.setMuted(false)} className="mr-3">muted=false</Button>
//             </div>
//             <div className="pb-3">
//                 <Button onClick={this.changeSource('sintelTrailer')} className="mr-3">Sintel teaser</Button>
//                 <Button onClick={this.changeSource('bunnyTrailer')} className="mr-3">Bunny trailer</Button>
//                 <Button onClick={this.changeSource('bunnyMovie')} className="mr-3">Bunny movie</Button>
//                 <Button onClick={this.changeSource('test')} className="mr-3">Test movie</Button>
//             </div>
//             <div>State</div>
//             <pre>
//                 <PrismCode className="language-json">
//                     {JSON.stringify(this.state.player, null, 2)}
//                 </PrismCode>
//             </pre>
//         </div>
//     );
// }
// }

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