import React from 'react';
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';
import { renderers } from 'react-markdown';
import flvjs from 'flv.js'

export default class TestAPI extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.cameraPhoto = null;
    this.videoRef = React.createRef();
    this.localStream = null;
    this.flvPlayer;
      this.state = {
        dataUri: '',
      }
  }

  componentDidMount() {
    if (flvjs.isSupported()) {
      var videoElement = document.getElementById('videoElement');
      this.flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: 'ws://localhost:8000/live/chapitre.flv'
      });
      console.log(this.flvPlayer)
      this.flvPlayer.attachMediaElement(videoElement);
      this.flvPlayer.load();
      this.flvPlayer.play();
    }

  }

  render() {
   
    return (
      <div>
        {/* <script src="https://cdn.bootcss.com/flv.js/1.4.0/flv.min.js"></script> */}
        <video id="videoElement"></video>
      </div>
    )
  }
}

//   componentDidMount() {
//     // We need to instantiate CameraPhoto inside componentDidMount because we
//     // need the refs.video to get the videoElement so the component has to be
//     // mounted.
//     this.cameraPhoto = new CameraPhoto(this.videoRef.current);
//   }

//   startCamera(idealFacingMode, idealResolution) {
//     this.cameraPhoto.startCamera(idealFacingMode, idealResolution)
//       .then(() => {
//         console.log('camera is started !');
//       })
//       .catch((error) => {
//         console.error('Camera not started!', error);
//       });
//     console.log(this.videoRef)
//   }

//   startCameraMaxResolution(idealFacingMode) {
//     this.cameraPhoto.startCameraMaxResolution(idealFacingMode)
//       .then(() => {
//         console.log('camera is started !');
//       })
//       .catch((error) => {
//         console.error('Camera not started!', error);
//       });
//   }

//   takePhoto() {
//     const config = {
//       sizeFactor: 1
//     };

//     this.dataUri = this.cameraPhoto.getDataUri(config);
//     this.setState({ dataUri });
//   }

//   stopCamera() {
//     this.cameraPhoto.stopCamer
//     a()
//       .then(() => {
//         console.log('Camera stoped!');
//       })
//       .catch((error) => {
//         console.log('No camera to stop!:', error);
//       });
//   }

//   render() {
//     navigator.getUserMedia(
//       { video: true, audio: true },
//       stream => {
//         this.localStream = stream;
//         $('.local video').attr('src', URL.createObjectURL(stream));
//         drawToCanvas();
//         init();
//       },
//       error => {
//         alert('error while accessing usermedia ' + error.toString());
//       }
//     );
//     return (
//       //   <div>
//       //     <button onClick={ () => {
//       //       this.facingMode = FACING_MODES.ENVIRONMENT;
//       //       this.idealResolution = { width: 640, height: 480 };
//       //       this.startCamera(facingMode, idealResolution);
//       //     }}> Start environment facingMode resolution ideal 640 by 480 </button>

//       //     <button onClick={ () => {
//       //       this.facingMode = FACING_MODES.USER;
//       //       this.startCamera(facingMode, {});
//       //     }}> Start user facingMode resolution default </button>

//       //     <button onClick={ () => {
//       //       this.facingMode = FACING_MODES.USER;
//       //       this.startCameraMaxResolution(facingMode);
//       //     }}> Start user facingMode resolution maximum </button>

//       //     <button onClick={ () => {
//       //       this.takePhoto();
//       //     }}> Take photo </button>

//       //     <button onClick={ () => {
//       //       this.stopCamera();
//       //     }}> Stop </button>

//       //     <video
//       //       ref={this.videoRef}
//       //       autoPlay="true"
//       //     />
//       //     <img
//       //       alt="imgCamera"
//       //       src={this.state.dataUri}
//       //     />
//       //   </div>
//       <div>
//         <video></video>
//         <canvas></canvas>
//       </div>
//     );
//   }
// }


// import React from 'react';
// import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';

// export default class TestAPI extends React.Component {
//   constructor(props, context) {
//     super(props, context);
//     this.cameraPhoto = null;
//     this.videoRef = React.createRef();
//     this.localStream = null;
//     this.preview = document.getElementById("preview");
//     this.recording = document.getElementById("recording");
//     this.startButton = document.getElementById("startButton");
//     this.stopButton = document.getElementById("stopButton");
//     this.downloadButton = document.getElementById("downloadButton");
//     this.logElement = document.getElementById("log");
//     this.recordingTimeMS = 5000;
//     this.state = {
//       dataUri: '',
//     }
//   }




//   log(msg) {
//     logElement.innerHTML += msg + "\n";
//   }
//   wait(delayInMS) {
//     return new Promise(resolve => setTimeout(resolve, delayInMS));
//   }
//   startRecording(stream, lengthInMS) {
//     let recorder = new MediaRecorder(stream);
//     let data = [];

//     recorder.ondataavailable = event => data.push(event.data);
//     recorder.start();
//     log(recorder.state + " for " + (lengthInMS / 1000) + " seconds...");

//     let stopped = new Promise((resolve, reject) => {
//       recorder.onstop = resolve;
//       recorder.onerror = event => reject(event.name);
//     });

//     this.recorded = wait(lengthInMS).then(
//       () => recorder.state == "recording" && recorder.stop()
//     );

//     return Promise.all([
//       stopped,
//       recorded
//     ])
//       .then(() => data);
//   }
//   stop(stream) {
//     stream.getTracks().forEach(track => track.stop());
//   }

//   componentDidMount() {
//     startButton.addEventListener("click", function () {

//     }, false); stopButton.addEventListener("click", function () {
//       stop(preview.srcObject);
//     }, false);
//   }

//   handleStart() {
//     navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true
//     }).then(stream => {
//       preview.srcObject = stream;
//       downloadButton.href = stream;
//       preview.captureStream = preview.captureStream || preview.mozCaptureStream;
//       return new Promise(resolve => preview.onplaying = resolve);
//     }).then(() => startRecording(preview.captureStream(), recordingTimeMS))
//       .then(recordedChunks => {
//         this.recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
//         recording.src = URL.createObjectURL(recordedBlob);
//         downloadButton.href = recording.src;
//         downloadButton.download = "RecordedVideo.webm";

//         log("Successfully recorded " + recordedBlob.size + " bytes of " +
//           recordedBlob.type + " media.");
//       })
//       .catch(log);
//   }

//   render() {
//     return (
//       <div>
//         <div className="left">
//           <button id="startButton" className="button" onClick={this.handleStart.bind(this)}>
//             Start
//   </button>
//           <h2>Preview</h2>
//           <video id="preview" width="160" height="120" autoPlay muted></video>
//         </div>
//         <div className="right">
//           <div id="stopButton" className="button">
//             Stop
//   </div>
//           <h2>Recording</h2>
//           <video id="recording" width="160" height="120" controls></video>
//           <a id="downloadButton" className="button">
//             Download
//   </a>
//         </div>
//         <div className="bottom">
//           <pre id="log"></pre>
//         </div>
//       </div>
//     )
//   }
// }

