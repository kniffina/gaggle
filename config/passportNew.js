var passport = require('passport');
var passportJWT = require('passport-jwt');
var BasicStrategy = require('passport-http').BasicStrategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');

var User = require('../models/User.js');
require('dotenv').config();
//var logger = require('../controllers/logging');

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = process.env.TOKEN_SECRET

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, callback) => {
  User.findById(jwtPayload.id)
    .exec((err, user) => {
      if (user && !err) {
        //logger.info(`JWT: User ${user.id} authenticated`);
        callback(null, user);
      } else if (err) {
        //logger.error('JWT: Error finding user', { err });
        callback(err, false);
      } else {
        //logger.info('JWT: User not found');
        callback(null, false);
      }
    });
}));

passport.use(new BasicStrategy((email, password, callback) => {
  User.findOne({ email: email }, (err, user) => {
    if (user && !err) {
      user.comparePassword(password, (err, isMatch) => {
        if (isMatch && !err) {
          //logger.info(`Basic: User ${user.id} authenticated`);
          callback(null, user);
        } else if (err) {
          //logger.error('Basic: Error comparing password', { err });
          callback(err, false);
        } else {
          //logger.info('Basic: email and password did not match', { email });
          callback(null, false);
        }
      });
    } else if (err) {
      //logger.error('Basic: Error finding user', { err });
      callback(err);
    } else {
      //logger.info('Basic: User not found', { email });
      callback(null, false);
    }
  });
}));

passport.use(new FacebookStrategy({
	clientID: configAuth.facebookAuth.clientID,
	clientSecret: configAuth.facebookAuth.clientSecret,
	callbackURL: configAuth.facebookAuth.callbackURL
	},
	// facebook will send back the token and profile
	function(token, refreshToken, profile, done) {
		// asynchronous
		process.nextTick(function() {
			// find the user in the database based on their facebook id
			User.findOne({ 'facebook.id': profile.id }, function(err, user) {
				if (err)
					return done(err);
				if (user) {
					return done(null, user); // user found
				} else {
					// if there is no user found with that facebook id, create them
					var newUser = new User();

					newUser.facebook.id = profile.id;                 
					newUser.facebook.token = token; // we will save the token that facebook provides                   
					newUser.facebook.firstName  = profile.name.givenName;
					newUser.facebook.lastName  = profile.name.familyName;
					newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

					// save user
					newUser.save(function(err) {
						if (err)
							throw err;
						// if successful, return the new user
						return done(null, newUser);
					});
				}
			});
		});
	})
);

exports.jwt = jwtOptions;
exports.basic = passport.authenticate('basic', { session: false });
exports.authenticate = passport.authenticate(['basic', 'jwt'], { session: false });