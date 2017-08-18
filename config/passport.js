var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var configAuth = require('./auth');
var User = require('../models/User.js');
var bcrypt = require('bcryptjs');
var controllers = require('../controllers/index.js');

//https://scotch.io/tutorials/easy-node-authentication-facebook

module.exports = function(passport) {

    //serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    //deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    //passport.use('local-signup', new LocalStrategy({
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        session: true,
        passReqToCallback: true
        },
        function(req, username, password, done) {
            //async
            process.nextTick(function() {
                User.findOne({username: username }, function(err, user) {
                    if(err)
                        return done(err);
                    if(user)
                        return done(null, false, {confirmation:'fail', message:'Username Already Exists'});
                    else {
                        controllers.user
                        .post(req.body)
                        .then(function(user) {
                            return done(null, user);
                        })
                        .catch(function(err) {
                            return done(err);
                        });
                    }
                });
            });
        })
    );

    // code for signup (use('local-login', new LocalStrategy))
    //passport.use('local-login', new LocalStrategy({
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        session: true,
        passReqToCallback: true
        },
        function(req, username, password, done) {
            User.findOne({username: username}, function(err, user) {
                if(err)
                    return done(err);
                if(!user)
                    return done(null, false, {confirmation:'fail', message:'Username or Password Incorrect'});
                else {
                    var passwordCorrect = bcrypt.compareSync(req.body.password, user.password);
                    if(passwordCorrect == false) {
                        return done(null, false, {confirmation:'fail', message: 'Username or Password Incorrect'});
                    }
                    return done(null, user);
                }
            });
        })
    );

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
};