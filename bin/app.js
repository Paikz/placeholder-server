"use strict";

//Vars
var express     = require("express");
var compression = require('compression');
var cors        = require('cors');
var bodyParser  = require('body-parser');
const path      = require("path");
var app         = express();

//Routes
var routes = require('../routes/routes');

//map routes to right directory
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', routes);
app.use(express.static(path.join(__dirname, '../content')));

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
