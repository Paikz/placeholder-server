"use strict";

var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');

var userSchema = mongoose.Schema({
    _id: {
        select: false,
        type: mongoose.Schema.ObjectId,
        default: mongoose.Types.ObjectId
    },
    __v: {
        select: false,
        type: Number
    },
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
    },
    following: [{ type: String, ref: 'User' }],
    followers: [{ type: String, ref: 'User' }],
    following_number: {
        type: Number,
        default: 0
    },
    followers_number: {
        type: Number,
        default: 0
    }

});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

var User = mongoose.model('User',userSchema);

module.export = User;
