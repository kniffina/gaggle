var express = require('express');
var router = express.Router();
var controllers = require('../controllers/index.js');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var authMiddleware = require('../config/authMiddleware');
var jwt = require('jsonwebtoken');
var auth = require('../config/passportNew.js');
require('dotenv').config();

router.get('/', function(req, res, next) {
	var results = [];
	var user = '';
	var username = '';

	if(req.user != null && req.user.id != null && req.user.username != null) {
		user = req.user;
		username = user.username;

		controllers['post']
		.get({author: username})
		.then(function(posts) {
			posts.forEach(function(post, i) {
				results.push({timestamp: post.timestamp, body: post.body});
			});
			var data = {
				title: "Account Home",
				user: {username: username},
				comments: results
				};
				
				res.json({
					confirmation: 'success',
					message: data
				});
		})
		.catch(function(err) {
			res.json({
				confirmation:'fail',
				message: err
			});
		});
	} else {
		var data = {
			title: "Account Home",
			user: {username: username},
			comments: results
			};

		res.status(401).json({
			confirmation: 'fail',
			message: 'req.user info missing'
		});
	}
});

//router.post('/login', passport.authenticate('local'), function(req, res) {
router.post('/login', auth.basic, function(req, res) {
	var payload = {id: req.user.id};
	var token = jwt.sign(payload, process.env.TOKEN_SECRET);
	var results = {token: token, user: req.user.summary()};
	res.json({results: results});
});

router.get('/logout', function(req, res, next) {
	req.logout();
	res.status(200).json({confirmation: 'success'});
});

//router.post('/currentuser', authMiddleware, function(req, res, next) {
router.post('/currentuser', auth.authenticate, function(req, res, next) {
	controllers['user']
	.getById(req.user.id)
	.then(function(user) {
		res.json({
			confirmation: 'success',
			user: user
		})
	})
	.catch(function(err) {
		res.json({
			confirmation: 'fail',
			message: err
		})
	});
});

router.get('/facebook', passport.authenticate('facebook', { session: false, scope: [] }));

router.get('/facebook/callback', passport.authenticate('facebook', { session: false }), function(req, res) {
	var payload = {id: req.user.id};
	var token = jwt.sign(payload, process.env.TOKEN_SECRET);
	var results = {token: token, user: req.user.summary()};
	res.json({results});
});

module.exports = router;