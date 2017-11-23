// for iOS
window.addEventListener('touchstart', function() {

  // create empty buffer
  var buffer = myContext.createBuffer(1, 1, 22050);
  var source = myContext.createBufferSource();
  source.buffer = buffer;

  // connect to output (your speakers)
  source.connect(myContext.destination);

  // play the file
  source.noteOn(0);
  alert('attempting to unlock audio...');

}, false);

function gotStream(stream) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext = new AudioContext();

    // Create an AudioNode from the stream.
    var mediaStreamSource = audioContext.createMediaStreamSource(stream);

    // Connect it to the destination to hear yourself (or any other node for processing!)
    mediaStreamSource.connect(audioContext.destination);
}

function onError() {
  console.log("Error accessing microphone.");
}

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
navigator.getUserMedia({audio:true}, gotStream, onError);