var osc = require("osc"),
    flock = require("flocking"),
    example = require("../chrome-app/js/example-synth.js");

// Also bind to a UDP socket.
var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57121
});

udpPort.on("ready", function () {
    console.log("Listening for UDP on port " + udpPort.options.localPort);
});

udpPort.on("osc", function (oscPacket) {
    //console.log(oscPacket);
    oscPacket.packets.forEach(function (oscMessage) {
        example.mapOSCToSynth(oscMessage, example.synth, example.synthValueMap);
    });
});

udpPort.on("error", function (err) {
    console.log(err);
});

udpPort.open();

// Start playing the synth.
flock.init();
example.synth.play();
