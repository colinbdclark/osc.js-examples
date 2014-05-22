(function () {

    "use strict";

    // A nice little FM synth.
    // Incoming OSC messages control the frequency and amplitude
    // of both the modulator and the carrier oscillators.
    var synth = flock.synth({
        synthDef: {
            id: "carrier",
            ugen: "flock.ugen.sin",
            freq: {
                ugen: "flock.ugen.value",
                rate: "audio",
                value: 400,
                add: {
                    id: "modulator",
                    ugen: "flock.ugen.sin",
                    freq: {
                        ugen: "flock.ugen.value",
                        rate: "audio",
                        value: 124
                    },
                    mul: 100
                }
            },
            mul: 0.3
        }
    });

    var freqTransform = function (value) {
        return (value * 6000) + 60;
    };

    var identityTransform = function (value) {
        return value;
    };

    var carrierSpec = {
        freq: {
            inputPath: "carrier.freq.value",
            transform: freqTransform
        },
        mul: {
            inputPath: "carrier.mul",
            transform: identityTransform
        }
    };

    var modulatorSpec = {
        freq: {
            inputPath: "modulator.freq.value",
            transform: freqTransform
        },
        mul: {
            inputPath: "modulator.mul",
            transform: freqTransform
        }
    };

    var synthValueMap = {
        "/knobs/0": carrierSpec.freq,
        "/fader1/out": carrierSpec.freq,

        "/knobs/1": carrierSpec.mul,
        "/fader2/out": carrierSpec.mul,

        "/knobs/2": modulatorSpec.freq,
        "/fader3/out": modulatorSpec.freq,

        "/knobs/3": modulatorSpec.mul,
        "/fader4/out": modulatorSpec.mul
    };

    var mapOSCToSynth = function (oscMessage, synth, valueMap) {
        var address = oscMessage.address;
        var value = oscMessage.args[0];
        var transformSpec = valueMap[address];

        var transformed = transformSpec.transform(value);
        synth.set(transformSpec.inputPath, transformed);
    };

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
            mapOSCToSynth(oscMessage, synth, synthValueMap);
        });
    });

    udpPort.on("error", function (err) {
        throw new Error(err);
    });

    udpPort.open();

    // Start playing the synth.
    flock.init();
    synth.play();
}());
