var example = example || {};

(function () {
    "use strict";

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

    example.SocketSynth = function () {
        this.oscPort = new osc.WebSocketPort({
            url: "ws://localhost:8081"
        });

        this.listen();
        this.oscPort.open();

        this.oscPort.socket.onmessage = function (e) {
            console.log("message", e);
        };
        
        this.valueMap = {
            "/knobs/0": carrierSpec.freq,
            "/fader1/out": carrierSpec.freq,

            "/knobs/1": carrierSpec.mul,
            "/fader2/out": carrierSpec.mul,

            "/knobs/2": modulatorSpec.freq,
            "/fader3/out": modulatorSpec.freq,

            "/knobs/3": modulatorSpec.mul,
            "/fader4/out": modulatorSpec.mul
        };

        this.synth = flock.synth({
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


    };

    example.SocketSynth.prototype.listen = function () {
        this.oscPort.on("open", this.play.bind(this));
        this.oscPort.on("message", this.mapMessage.bind(this));
        this.oscPort.on("message", function (msg) {
            console.log("message", msg);
        });
        this.oscPort.on("close", this.pause.bind(this));
    };

    example.SocketSynth.prototype.play = function () {
        if (!flock.enviro.shared) {
            flock.init();
        }

        this.synth.play();
    };

    example.SocketSynth.prototype.pause = function () {
        this.synth.pause();
    };

    example.SocketSynth.prototype.mapMessage = function (oscMessage) {
        $("#message").text(fluid.prettyPrintJSON(oscMessage));

        var address = oscMessage.address;
        var value = oscMessage.args[0];
        var transformSpec = this.valueMap[address];

        if (transformSpec) {
            var transformed = transformSpec.transform(value);
            this.synth.set(transformSpec.inputPath, transformed);
        }
    };

}());
