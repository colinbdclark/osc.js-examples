(function () {

    "use strict";

    // Enumerate all the serial port devices and render them to the dropdown.
    chrome.serial.getDevices(function (ports) {
        var portSelector = $("#portSelector");

        portSelector.empty();
        ports.forEach(function (port) {
            var label = port.displayName || port.path;
            var option = $("<option value=" + "'" + port.path + "'>" + label + "</option>");
            portSelector.append(option);
        });

        var selectPort = function () {
            var selectedDevice = $("#portSelector").val();
            connectToSerialPort(selectedDevice);
        };

        portSelector.change(selectPort);

        if (ports.length === 1) {
            selectPort();
        }

    });

    var connectToSerialPort = function (devicePath) {
        // Instantiate a new OSC Serial Port.
        var serialPort = new osc.chrome.SerialPort({
            devicePath: devicePath
        });

        // Listen for the message event and map the OSC message to the synth.
        serialPort.on("message", function (oscMessage) {
            mapOSCToSynth(oscMessage, synth, synthValueMap);
            $("#message").text(fluid.prettyPrintJSON(oscMessage));
        });

        // Open the port.
        serialPort.open();
    };

    // Also bind to a UDP socket.
    var udpPort = new osc.chrome.UDPPort({
        localAddress: "0.0.0.0",
        localPort: 57121
    });

    udpPort.on("ready", function () {
        $("#udpStatus").text("Listening for UDP on port " + udpPort.options.localPort);
    });

    // Map Lemur bundled messages to the synth.
    udpPort.on("osc", function (oscPacket) {
        $("#message").text(fluid.prettyPrintJSON(oscPacket));

        oscPacket.packets.forEach(function (oscMessage) {
            example.mapOSCToSynth(oscMessage, example.synth, example.synthValueMap);
        });
    });

    udpPort.on("error", function (err) {
        throw new Error(err);
    });

    udpPort.open();

    // Start playing the synth.
    flock.init();
    example.synth.play();
}());
