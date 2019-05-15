"use strict";

var fluid = require("infusion"),
    osc = require("osc"),
    oscjsExamples = fluid.registerNamespace("oscjsExamples");

fluid.defaults("oscjsExamples.electron.serialPortLogger", {
    gradeNames: "fluid.component",

    members: {
        serialPort: "@expand:oscjsExamples.electron.createSerialPort()"
    },

    events: {
        onMessage: null
    },

    listeners: {
        "onCreate.bindMessageLogger": {
            "this": "{that}.serialPort",
            method: "on",
            args: ["message", "{that}.events.onMessage.fire"]
        },

        "onCreate.openPort": {
            priority: "last",
            "this": "{that}.serialPort",
            method: "open"
        },

        "onMessage.print": {
            "this": "console",
            method: "log",
            args: "{arguments}.0"
        }
    }
});

oscjsExamples.electron.createSerialPort = function () {
    return new osc.SerialPort({
        devicePath: process.argv[2] || "/dev/tty.usbmodem221361"
    });
};
