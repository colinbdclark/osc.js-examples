/*
This example supposed two machines on a local network with the network names computerA and computerB.

The main thing about sending over a LAN is that you can't use 127.0.0.1 or "localhost" as your local address - 
you can use your network address or 0.0.0.0.
*/

//Set up computerA to send to computerB...

var osc = require("osc");

var udp = new osc.UDPPort({
    localAddress: "computerA.local", // could also use 0.0.0.0
    localPort: 5000,
    remoteAddress: "computerB.local",
    remotePort: 9999
});

udp.open();

udp.on("ready", function () {

    console.log("ready");
    
    setInterval(function () {
        console.log("sending osc...");
        udp.send({
            address: "/sending/every/second",
            args: [1, 2, 3]
        })
    }, 1000);
});


