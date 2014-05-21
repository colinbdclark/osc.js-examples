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

    var synthValueMap = {
        "/knobs/0": {
            inputPath: "carrier.freq.value",
            transform: freqTransform
        },
        "/knobs/1": {
            inputPath: "carrier.mul",
            transform: identityTransform
        },

        "/knobs/2": {
            inputPath: "modulator.freq.value",
            transform: freqTransform
        },
        "/knobs/3": {
            inputPath: "modulator.mul",
            transform: freqTransform
        }
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

        portSelector.change(function () {
            var selectedDevice = $("#portSelector").val();
            connectToSerialPort(selectedDevice);
        })
    });

    var connectToSerialPort = function (devicePath) {
        // Instantiate a new OSC Serial Port.
        var port = new osc.chrome.SerialPort({
            devicePath: "/dev/cu.usbmodem22131"
        });

        // Listen for the message event and map the OSC message to the synth.
        port.on("message", function (oscMessage) {
            mapOSCToSynth(oscMessage, synth, synthValueMap);
            $("#message").text(JSON.stringify(oscMessage));
        });

        // Open the port.
        port.open();
    };

    // Start playing the synth.
    flock.init();
    synth.play();
}());
