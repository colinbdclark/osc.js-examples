var osc = require("osc"),
    flock = require("flocking"),
    example = require("../chrome-app/js/example-synth.js");

/*******************
 * OSC Over Serial *
 *******************/

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


/****************
 * OSC Over UDP *
 ****************/

var getIPAddresses = function () {
    var os = require("os"),
        interfaces = os.networkInterfaces(),
        ipAddresses = [];

    for (var deviceName in interfaces) {
        var addresses = interfaces[deviceName];
        for (var i = 0; i < addresses.length; i++) {
            var addressInfo = addresses[i];
            if (addressInfo.family === "IPv4" && !addressInfo.internal) {
                ipAddresses.push(addressInfo.address);
            }
        }
    }

    return ipAddresses;
};

var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57121
});

udpPort.on("ready", function () {
    var ipAddresses = getIPAddresses();

    console.log("Listening for OSC over UDP.");
    ipAddresses.forEach(function (address) {
        console.log(" Host:", address + ", Port:", udpPort.options.localPort);
    });
});

udpPort.on("message", function (oscMessage) {
    example.mapOSCToSynth(oscMessage, example.synth, example.synthValueMap);
});

udpPort.on("error", function (err) {
    console.log(err);
});

udpPort.open();

// Start playing the synth.
flock.init();
example.synth.play();
