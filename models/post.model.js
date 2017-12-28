"use strict";

var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        required: true,
    },
    description: {
        type: String,
        default: '...'
    },
    img: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

var Post = mongoose.model('Post',postSchema);

module.export = Post;
