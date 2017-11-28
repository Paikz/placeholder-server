#!/usr/bin/env node
"use strict";

var http = require('http');
var app = require('./bin/app');
var server = http.createServer(app);

// Start up server
console.log("Express is ready.");
const port = process.env.PORT || '3000';

server.listen(port);
console.log("Listening on port: " + port);
