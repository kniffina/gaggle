var Location = require('../models/Location.js');
var promise = require('bluebird');
var https = require('https');
var configAuth = require('../config/auth');
var querystring = require('querystring');
var urlTools = require('url');

module.exports = {
	
	get: function(params) {
		return new promise(function(resolve, reject) {
			if(params.long != null && params.lat != null) {
				var limit = params.limit || 25;
				var maxDistance = params.distance || 100; // 100 km
				//convert distance to radians; earth radius ~ = 6371 km
				maxDistance /= 6371;

				var coordinates = [];
				coordinates[0] = params.long;
				coordinates[1] = params.lat;

				Location.find({
					loc: {
						$near: coordinates,
						$maxDistance: maxDistance
					}
				}).limit(limit).exec(function(err, locations) {
					if(err) {
						reject(err);
						return;
					}
					var results = [];
					locations.forEach(function(location, i) {
						results.push(location.summary()); //probably a waste of time but will leave it in case we want to add summary
					});
					resolve(results);
				});
			} else if(params.name != null && (params.long == null || params.lat == null)){
				Location.find({'name' : params.name.trim()}, function(err, locations) {
					if(locations.length == 0) {			
						module.exports.googleMapRequest(params.name.trim())
						.then(function(response) {
							
							var geo = response.results[0].geometry;
							var newBody = {
								name: params.name.trim(), 
								loc:[geo.location.lng, geo.location.lat]
							}
							Location.create(newBody, function(err, location) {
								if(err) {
									reject(err);
									return;
								}
								resolve(location.summary());
							})
						})
						.catch(function(err) {
							console.log('google map api req err: ' + err);
							reject(err);
							return;
						})
					} else {
						var results = [];
						locations.forEach(function(location, i) {
							results.push(location.summary());
						});
						resolve(results);
					}
				})	
			} else { //else we'll return all of them
				Location.find(params, function(err, locations) {
					if(err) {
						reject(err);
						return;
					}
					var results = [];
					locations.forEach(function(location, i) {
						results.push(location.summary());
					});
					resolve(results);
				});
			}
		});
	},

	getById: function(id) {
		return new promise(function(resolve, reject) {
			Location.findById(id, function(err, location) {
				if(err || location == null) {
					reject(new Error('Location Not Found'));
					return;
				}
				resolve(location.summary());
			});
		});
	},

	post: function(body) {
		return new promise(function(resolve, reject) {
			var newBody = {name: body.name, loc:[body.long, body.lat]}
			Location.create(newBody, function(err, location) {
				if(err) {
					reject(err);
					return;
				}
				resolve(location.summary());
			});
		});
	},
	
	delete: function(id) {
		return new promise(function(resolve, reject) {
			Location.findByIdAndRemove(id, function(err) {
				if(err) {
					reject(err);
					return;
				}
				resolve(); //nothing to return
			});
		});
	},
	
	googleMapRequest(destination) {
		return new promise(function(resolve, reject) {
			var p = {
				'address': destination.trim(),
				'key': configAuth.googleMaps.apiKey
			}

			var url = configAuth.googleMaps.url + querystring.stringify(p);
			url = urlTools.parse(url);
			
			var response = [];
			
			https.get(url, (res) => {
			//https.get('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBTY1Z2s-0_csWXbVtXQjfxxlXfOE4mgPc&address=Cancun', (res) => {
				console.log(url);
				res.on('data', (d) => {
					response.push(d);
				})
				res.on('end', function() {
					response = response.join('');
					console.log(response);
					response = JSON.parse(response);

					if(response == null || response.status != "OK" || response.results == null) {
						reject(results);
					} if(response.results.length == 0) {
						resolve(results);
					} else {
						resolve(response);
					}
				});
			})
			.on('error', (e) => {
				console.error(e);
				reject(e);
			});			
		});
	}
};