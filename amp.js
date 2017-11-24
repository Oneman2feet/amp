var audioContext;

// for iOS
/*
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
      document.body.innerHTML = "Sound is unlocked!";
    }
  }, 0);
}
*/

// context state at this time is `undefined` in iOS8 Safari
function unlock() {
  if (audioContext.state === 'suspended') {
    var resume = function () {
      audioContext.resume();

      setTimeout(function () {
        if (ctx.state === 'running') {
          document.body.removeEventListener('touchend', resume, false);
        }
      }, 0);
    };

    document.body.addEventListener('touchend', resume, false);
  }
}

function gotStream(stream) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();

    // Create an AudioNode from the stream.
    var mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Connect it to the destination to hear yourself (or any other node for processing!)
    mediaStreamSource.connect(audioContext.destination);
    unlock();
    alert(audioContext.baseLatency);
}

function onError() {
  console.log("Error accessing microphone.");
}

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
navigator.getUserMedia({audio:true}, gotStream, onError);

//window.addEventListener('touchstart', unlock, false);


// ios unlock
/*
var ctx = null, usingWebAudio = true;

try {
  if (typeof AudioContext !== 'undefined') {
      ctx = new AudioContext();
  } else if (typeof webkitAudioContext !== 'undefined') {
      ctx = new webkitAudioContext();
  } else {
      usingWebAudio = false;
  }
} catch(e) {
    usingWebAudio = false;
}

// context state at this time is `undefined` in iOS8 Safari
if (usingWebAudio && ctx.state === 'suspended') {
  var resume = function () {
    ctx.resume();

    setTimeout(function () {
      if (ctx.state === 'running') {
        document.body.removeEventListener('touchend', resume, false);
      }
    }, 0);
  };

  document.body.addEventListener('touchend', resume, false);
}
*/

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