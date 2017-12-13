"use strict";

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var testSchema = mongoose.Schema({
    name: String,
    age:  { type: Number, min: 1, max: 99 }
});

var User = mongoose.model('User',testSchema);

module.export = User;
