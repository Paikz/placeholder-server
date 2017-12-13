#!/usr/bin/env node
"use strict";

var http = require('http');
var mongoose = require('mongoose');
var app = require('./bin/app');
var socket = require('./websocket/socket');
var server = http.createServer(app);
var socketServer = socket(server);

//Mongoose
const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/test";
mongoose.connect(dsn, { useMongoClient: true });
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error with mongodb:'));

db.once('open', function() {
  console.log("Connected to mongodb.")
});

// Start up server
console.log("Express is ready.");
const port = process.env.PORT || '3000';

server.listen(port);
console.log("Listening on port: " + port);
