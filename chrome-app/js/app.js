(function () {

    "use strict";

    var oscMessageListener = function (oscMessage) {
        example.mapOSCToSynth(oscMessage, example.synth, example.synthValueMap);
        $("#message").text(fluid.prettyPrintJSON(oscMessage));
    };

    /*******************
     * OSC Over Serial *
     *******************/

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
        var serialPort = new osc.SerialPort({
            devicePath: devicePath
        });

        // Listen for the message event and map the OSC message to the synth.
        serialPort.on("message", oscMessageListener);

        // Open the port.
        serialPort.open();
    };


    /****************
     * OSC Over UDP *
     ****************/

    var getIPAddresses = function () {
        var ipAddresses = [];
        chrome.system.network.getNetworkInterfaces(function (interfaces) {
            interfaces.forEach(function (iface) {
                if (iface.prefixLength === 24) {
                    ipAddresses.push(iface.address);
                }
            });
        });

        return ipAddresses;
    };

    // Also bind to a UDP socket.
    var udpPort = new osc.UDPPort({
        localAddress: "0.0.0.0",
        localPort: 57121
    });

    udpPort.on("ready", function () {
        var ipAddresses = getIPAddresses(),
            addressPortStrings = [];

        ipAddresses.forEach(function (address) {
            addressPortStrings.push(address + ":" + udpPort.options.localPort);
        });

        $("#udpStatus").append("<div>UDP: <span>" + addressPortStrings.join(",") + "</span></div>");
    });

    udpPort.on("message", oscMessageListener);
    udpPort.on("error", function (err) {
        throw new Error(err);
    });

    udpPort.open();

    // Start playing the synth.
    flock.init();
    example.synth.play();
}());
