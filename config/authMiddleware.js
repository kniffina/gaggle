//blog.risingstack.com/node-hero-node-js-authentication-passport-js/

module.exports = function authMiddleware() {
	return function (req, res, next) {
		if(req.isAuthenticated()) {
			return next();
		}
		res.status(400);
		res.json({confirmation: 'fail', message: 'unauthorized: invalid or missing credentials'});
	}
}