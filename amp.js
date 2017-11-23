/*

window.AudioContext = window.AudioContext || window.webkitAudioContext;

var context = new AudioContext();

navigator.getUserMedia({audio: true}, function(stream) {
  var microphone = context.createMediaStreamSource(stream);
  var filter = context.createBiquadFilter();

  // microphone -> filter -> destination.
  microphone.connect(filter);
  filter.connect(context.destination);
}, errorCallback);

*/

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var aCtx;
var analyser;
var microphone;
if (navigator.getUserMedia) {
    navigator.getUserMedia(
        {audio: true}, 
        function(stream) {
            aCtx = new AudioContext();
            analyser = aCtx.createAnalyser();
            microphone = aCtx.createMediaStreamSource(stream);
            microphone.connect(analyser);
            var destination=aCtx.destination;
            analyser.connect(destination);
        },
        function(){ console.log("Error 003.")}
     );
} 