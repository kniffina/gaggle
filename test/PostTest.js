process.env.NODE_ENV = 'test';

//https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai

var mongoose = require("mongoose");
var Post = require('../models/Post.js');

var chai = require('chai');
var chaiHttp = require('chai-http');
//var app = require('../bin/www');
var app = require('../app.js');
var should = chai.should();

chai.use(chaiHttp);

describe('GET api/post', function() {
	it('it should return all posts', function(done) {
		chai.request(app)
		.get('/api/post')
		.end(function(err, res) {
			res.should.have.status(200);
			res.body.results.should.be.a('array');
			done();
		});
	});
});