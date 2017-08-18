var User = require('../models/User');
var promise = require('bluebird');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

module.exports = {
	get: function(params, isRaw) {
		return new promise(function(resolve, reject) {
			if(isRaw == null)
				isRaw = false;

			User.find(params, function(err, users) {
				if(err) {
					reject(err);
					return;
				}
				if(isRaw == true) {
					resolve(users);
					return;
				}
				var results = [];
				users.forEach(function(user, i) {
					results.push(user.summary());
				});
				resolve(results);
			});
		});
	},

	getById: function(id) {
		return new promise(function(resolve, reject) {
			User.findById(id, function(err, user) {
				if(err) {
					reject(err);
					return;
				} 
				if(user == null) {
					reject(new Error('User Not Found'));
					return;
				}
				resolve(user.summary());
			});
		});
	},

	//we are going to need to come back to this post controller for facebook
	post: function(body) {
		return new promise(function(resolve, reject) {
			if(body.password !== null) {
				var password = body.password;
				var hashed = bcrypt.hashSync(password, 10);
				body['password'] = hashed;
			}
			var newSignIn = false;
			if(body.signIn != null) {
				newSignIn = body.signIn == 'true';
				delete body['signIn'];
			}
			User.create(body, function(err, user) {
				if(err) {
					reject(err);
					return;
				}
				if(newSignIn) {
				//return token and user
					var payload = {id: user.id};
					var token = jwt.sign(payload, process.env.TOKEN_SECRET);
					var results = {token: token, user: user.summary()};
					resolve({results: results});
				} else {
					resolve(user.summary());
				}
			});
		});
	},

	put: function(id, params) {
		return new promise(function(resolve, reject) {
			if(params.newPassword != null) {
				var password = body.newPassword;
				var hashed = bcrypt.hashSync(password, 10);
				body['password'] = hashed;
				delete body['newPassword'];
			}
			User.findByIdAndUpdate(id, params, {new:true}, function(err, user) {
				if(err) {
					reject(err);
					return;
				}
				resolve(user.summary());
			});
		});
	},

	delete: function(id) {
		return new promise(function(resolve, reject) {
			Post.findByIdAndRemove(id, function(err) {
				if(err) {
					reject(err);
					return;
				}
				resolve(); //nothing to return
			});
		});
	}
};