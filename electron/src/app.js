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
        y: 0,
        width: 640,
        height: 480
    },


    model: {
        url: {
            expander: {
                funcName: "fluid.stringTemplate",
                args: [
                    "%url/src/client/html/main-window.html",
                    "{app}.env.appRoot"
                ]
            }
        }
    }
});
