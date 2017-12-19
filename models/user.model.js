"use strict";

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var userSchema = mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    email: {
        type: String,
        unique: true,
        dropDups: true,
        lowercase: true
    },
    password:  {
      type: String,
      required: true
    }
});

var User = mongoose.model('User',userSchema);

module.export = User;
