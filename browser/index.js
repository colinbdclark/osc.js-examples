var osc = require("osc"),
    http = require("http"),
    express = require("express"),
    WebSocket = require("ws");

// Bind to a UDP socket to listen for incoming OSC events.
var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57121
});

udpPort.open();

// Create an Express-based Web Socket server to which OSC messages will be relayed.
var appResources = __dirname + "/web",
    app = express(),
    server = app.listen(8081),
    wss = new WebSocket.Server({
        server: server
    });

app.use("/", express.static(appResources));
wss.on("connection", function (socket) {
    console.log("A Web Socket connection has been established!");
    var socketPort = new osc.WebSocketPort({
        socket: socket
    });

    socket.on("message", function () {
        console.log("message");
    });

    socketPort.on("raw", function () {
        console.log("raw");
    });

    socketPort.on("bundle", function () {
        console.log("bundle");
    });

    var relay = new osc.Relay(udpPort, socketPort, {
        raw: true
    });
});
