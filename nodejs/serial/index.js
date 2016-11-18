var osc = require("osc");

// Instantiate a new OSC Serial Port.
var serialPort = new osc.SerialPort({
    devicePath: process.argv[2] || "/dev/cu.usbmodem22131"
});

// Listen for the message event and map the OSC message to the synth.
serialPort.on("message", function (oscMessage) {
    //example.mapOSCToSynth(oscMessage, example.synth, example.synthValueMap);
    console.log(oscMessage);
});

// Open the port.
serialPort.open();

process.stdin.resume();
