var audioContext;

function gotStream(stream) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
    var mediaStreamSource = audioContext.createMediaStreamSource(stream);
    mediaStreamSource.connect(audioContext.destination);
    alert(navigator.mediaDevices.getSupportedConstraints().latency);
}

function onError() {
  console.log("Error accessing microphone.");
}

function start() {
  navigator.getUserMedia({audio:true}, gotStream, onError);
  //navigator.mediaDevices.getUserMedia({ audio: { latency: 0.05, echoCancellation: false, mozNoiseSuppression: true, mozAutoGainControl: false} });
}

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

window.addEventListener('touchstart', unlock, false);