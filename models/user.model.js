"use strict";

var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        dropDups: true,
        lowercase: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        dropDups: true,
        lowercase: true,
        required: true,
        trim: true
    },
    password:  {
        type: String,
        required: true,
        select: false
    },
    img: {
        type: String,
    }
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

var User = mongoose.model('User',userSchema);

module.export = User;
