"use strict";
exports.__esModule = true;
var simple_1 = require("./simple");
var fs_1 = require("fs");
console.log(simple_1.protoMetadata);
fs_1.writeFileSync('./out', JSON.stringify(simple_1.protoMetadata, undefined, 2));
