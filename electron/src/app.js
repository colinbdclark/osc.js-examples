/*jshint node:true*/

"use strict";

var fluid = require("infusion"),
    oscjsExamples = fluid.registerNamespace("oscjsExamples");

require("infusion-electron");

fluid.defaults("oscjsExamples.electron.app", {
    gradeNames: "electron.app",

    components: {
        mainWindow: {
            createOnEvent: "onReady",
            type: "oscjsExamples.electron.window"
        },

        serialPortLogger: {
            type: "oscjsExamples.electron.serialPortLogger"
        }
    }
});

fluid.defaults("oscjsExamples.electron.window", {
    gradeNames: "electron.browserWindow",

    windowOptions: {
        title: "osc.js Electron serial port example",
        x: 0,
        y: 0
    },

    url: "html/main-window.html",

    model: {
        dimensions: {
            width: 640,
            height: 480
        }
    }
});
