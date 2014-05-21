var osc = require("osc");

var rawMessage = new Buffer(20);
rawMessage.write("/cat", 0, 4, "ascii");
rawMessage.writeUInt32BE(0, 8);
rawMessage.write(",s", 8, 2, "ascii");
rawMessage.writeUInt32BE(0, 10);
rawMessage.write("meow", 12, 4, "ascii");
rawMessage.writeUInt32BE(0, 16);

var message = osc.readMessage(rawMessage);
console.log(JSON.stringify(message));
