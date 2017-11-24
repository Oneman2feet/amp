var audioContext;

function gotStream(stream) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
    var mediaStreamSource = audioContext.createMediaStreamSource(stream);
    mediaStreamSource.connect(audioContext.destination);
    unlock();
}

function onError() {
  console.log("Error accessing microphone.");
}

function start() {
  navigator.getUserMedia({audio:true}, gotStream, onError);
}

// latency
/*

console.log("test started");
console.log("MediaTrackSettings.latency: " + navigator.mediaDevices.getSupportedConstraints().latency);
navigator.getUserMedia = (navigator.getUserMedia ||
                            navigator.webkitGetUserMedia ||
                            navigator.mozGetUserMedia ||
                            navigator.msGetUserMedia);

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

console.log('audioCtx: ' + audioCtx);

if (navigator.getUserMedia) {
  console.log('getUserMedia supported.');
  if (navigator.mediaDevices.getUserMedia) {
    console.log("navigator.mediaDevices.getUserMedia exists");
    var p = navigator.mediaDevices.getUserMedia({ audio: { latency: 0.05, echoCancellation: false, mozNoiseSuppression: true, mozAutoGainControl: false} });
    //var p = navigator.mediaDevices.getUserMedia({ audio: true });

    p.then(function(stream) {
      console.log("navigator.mediaDevices.getUserMedia started processStream(stream)");
      processStream(stream);
      //console.dir(stream);
      //console.dir(stream.getAudioTracks());
      //console.dir(stream.getAudioTracks()[0].getSettings());
      //console.dir(stream.getAudioTracks()[0].getCapabilities());
      //console.dir(stream.getAudioTracks()[0].getConstraints());
    });
    p.catch(function(err) { console.log(err.name); });
  }
} else {
  console.log('getUserMedia not supported on your browser!');
}

function processStream(stream) {
  console.log("ProcessingStream started");
  //get source
  source = audioCtx.createMediaStreamSource(stream);
  console.log("ProcessingStream source is created. source: " + source);
  source.connect(audioCtx.destination);
}

*/


// for iOS audio unlocking
var isUnlocked = false;
function unlock() {
  if (isUnlocked) return;

  // create empty buffer and play it
  var buffer = audioContext.createBuffer(1, 1, 22050);
  var source = audioContext.createBufferSource();
  source.buffer = buffer;
  source.connect(audioContext.destination);
  source.start(0);

  // by checking the play state after some time, we know if we're really unlocked
  setTimeout(function() {
    if((source.playbackState === source.PLAYING_STATE || source.playbackState === source.FINISHED_STATE)) {
      isUnlocked = true;
      alert("sound unlocked");
    }
  }, 0);
}