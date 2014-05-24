var osc = require("osc"),
    flock = require("flocking"),
    example = require("../chrome-app/js/example-synth.js");

// Instantiate a new OSC Serial Port.
var serialPort = new osc.SerialPort({
    devicePath: process.argv[2] || "/dev/cu.usbmodem22131"
});

// Listen for the message event and map the OSC message to the synth.
serialPort.on("message", function (oscMessage) {
    example.mapOSCToSynth(oscMessage, example.synth, example.synthValueMap);
});

// Open the port.
serialPort.open();

// Also bind to a UDP socket.
var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57121
});

udpPort.on("ready", function () {
    console.log("Listening for UDP on port " + udpPort.options.localPort);
});

udpPort.on("bundle", function (oscPacket) {
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
