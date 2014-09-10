//--------------------------------------------------
//  Bi-Directional OSC messaging Websocket <-> UDP
//--------------------------------------------------
var osc = require("osc"),
    http = require("http"),
    express = require("express"),
    WebSocket = require("ws");

var getIPAddresses = function () 
{
  var os = require("os"),
      interfaces = os.networkInterfaces(),
      ipAddresses = [];

  for (var deviceName in interfaces) 
  {
      var addresses = interfaces[deviceName];
      
      for (var i = 0; i < addresses.length; i++) 
      {
          var addressInfo = addresses[i];
      
          if (addressInfo.family === "IPv4" && !addressInfo.internal) {
              ipAddresses.push(addressInfo.address);
          }
      }
  }

  return ipAddresses;
};

//--------------------------------------------------
//  Relay messages UDP -> websocket
//--------------------------------------------------
var udpIn = new osc.UDPPort(
{
  localAddress: "0.0.0.0",
  localPort: 7400
});

udpIn.on("ready", function () 
{
  var ipAddresses = getIPAddresses();
  console.log("Listening for OSC over UDP.");
  ipAddresses.forEach(function (address) {
    console.log(" Host:", address + ", Port:", udpIn.options.localPort);
  });
});

udpIn.open();

var appIn = express(),
  serverIn = appIn.listen(8081),
  wssIn = new WebSocket.Server(
  {
    server: serverIn
  });

wssIn.on("connection", function (socket) 
{
  console.log("A Web Socket connection has been established!");
  var socketPort = new osc.WebSocketPort({
      socket: socket
  });

  var relay = new osc.Relay(udpIn, socketPort, {
      raw: true
  });
});


//--------------------------------------------------
//  Relay messages websocket -> UDP
//--------------------------------------------------
var udpOut = new osc.UDPPort (
{
  remoteAddress: "127.0.0.1",
  remotePort: 7500
});

udpOut.on("ready", function()
{
  var ipAddresses = getIPAddresses();
  console.log("broadcasting OSC over UDP.");
  ipAddresses.forEach(function (address) {
    console.log(" Host:", address + ", Port:", udpOut.options.localPort);
  });
})

udpOut.open();

var appOut = express(),
    serverOut = appOut.listen(8082),
    wssOut = new WebSocket.Server(
    {
      server: serverOut
    });

wssOut.on("connection", function (socket) 
{
  console.log("Websocket connected on port 8082");
  socket.on("message", function (data) 
        { // Forward the raw OSC data to the UDP port.
          udpOut.sendRaw(data);
        });
});

