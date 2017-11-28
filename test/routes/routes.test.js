/**
* Test for Routes
 */
"use strict";

/* global before it describe */
var request = require('supertest');

describe('loading express', function() {
    var server;

    before(function() {
        server = require('../../bin/app');
    });

    it('respond to /', function testIndex(done) {
        request(server)
            .get('/')
            .expect(200, done);
    });

    it('respond to /random/failure/', function testError(done) {
        request(server)
            .get('/random/failure')
            .expect(404, done);
    });
});
