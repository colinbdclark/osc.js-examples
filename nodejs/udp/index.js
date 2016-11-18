var osc = require("osc");

// Also bind to a UDP socket.
var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57121
});

udpPort.on("ready", function () {
    console.log("Listening for UDP on port " + udpPort.options.localPort);
});

udpPort.on("message", function (oscMessage) {
    console.logt(oscMessage);
});

udpPort.on("error", function (err) {
    console.log(err);
});

udpPort.open();
