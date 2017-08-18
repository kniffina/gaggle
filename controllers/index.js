var PostController = require('./PostController');
var UserController = require('./UserController');
var LocationController = require('./LocationController');
var EventController = require('./EventController');

// key are named after resource
module.exports = {
	post: PostController,
	user: UserController,
	location: LocationController,
	event: EventController
};