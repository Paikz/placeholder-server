"use strict";

//Vars
var express = require("express");
var bodyParser = require('body-parser');
const path = require("path");

//Routes
var routes = require('../routes/routes');

var app = express();

//map routes to right directory
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    /* istanbul ignore if  */
    if (res.headersSent) {
        return next(err);
    }
    err.status = err.status || /* istanbul ignore next: hard to reproduce this failure */ 500;
    res.status(err.status);
    res.json({
        error: err,
        message: err.message
    });
});

//Use line below if you want to use app in other files with app = require(path)
module.exports = app;
