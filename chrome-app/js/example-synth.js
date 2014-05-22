var flock = flock || require("../../nodejs/node_modules/flocking"),
    example = example || {};

(function () {

    "use strict";

    // A nice little FM synth.
    // Incoming OSC messages control the frequency and amplitude
    // of both the modulator and the carrier oscillators.
    example.synth = flock.synth({
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

    example.synthValueMap = {
        "/knobs/0": carrierSpec.freq,
        "/fader1/out": carrierSpec.freq,

        "/knobs/1": carrierSpec.mul,
        "/fader2/out": carrierSpec.mul,

        "/knobs/2": modulatorSpec.freq,
        "/fader3/out": modulatorSpec.freq,

        "/knobs/3": modulatorSpec.mul,
        "/fader4/out": modulatorSpec.mul
    };

    example.mapOSCToSynth = function (oscMessage, synth, valueMap) {
        var address = oscMessage.address;
        var value = oscMessage.args[0];
        var transformSpec = valueMap[address];

        if (transformSpec) {
            var transformed = transformSpec.transform(value);
            synth.set(transformSpec.inputPath, transformed);
        }
    };

        // If we're in a require-compatible environment, export ourselves.
    if (typeof module !== "undefined" && module.exports) {
        module.exports = example;
    }

}());
