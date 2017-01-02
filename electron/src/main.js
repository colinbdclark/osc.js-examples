"use strict";

var fluid = require("infusion");

require("./serialport-logger.js")
require("./app.js");

var electronExamples = fluid.registerNamespace("oscjsExamples.electron");
electronExamples.app();
