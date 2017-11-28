"use strict";

//Vars
var express = require("express");
const path = require("path");

//Routes
var routes = require('../routes/routes');

var app = express();

//map routes to right directory
app.use('/', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    var err = new Error("Not Found");

    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    err.status = err.status || 500;
    res.status(err.status);
    res.json({
        error: err,
        message: err.message
    });
});

//Use line below if you want to use app in other files with app = require(path)
module.exports = app;
