/*
This example shows sending UDP over a LAN between two machines with the network names computerA and computerB.

The main difference when sending over a LAN is that you can't use 127.0.0.1 or "localhost" in the "localAddress" property - 
you need to use the computer's own network address, or 0.0.0.0
*/

//This is computerB, receiving OSC from computerA...

var osc = require("osc");
var udp = new osc.UDPPort({
    localAddress: "computerB.local", // could also use 0.0.0.0
    localPort: 9999
});

udp.open();

udp.on("ready", function () {
    console.log("receiver is ready");
});

udp.on("message", function(message, timetag, info) {
   console.log(message); 
});
