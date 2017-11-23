navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var aCtx;
var analyser;
var microphone;
if (navigator.getUserMedia) {
  navigator.getUserMedia({audio: true}, function(stream) {
    console.log("loading audio...");
    aCtx = new AudioContext();
    analyser = aCtx.createAnalyser();
    microphone = aCtx.createMediaStreamSource(stream);
    microphone.connect(analyser);
    var destination = aCtx.destination;
    analyser.connect(destination);
    console.log("loaded audio.");
  }, function() { console.log("Error 003."); });
}

console.log("loaded script.");