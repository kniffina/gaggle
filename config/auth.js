require('dotenv').config();

const host = process.env.NODE_HOST || 'localhost';
const port = process.env.PORT || 8080;
const facebookClientID = process.env.FACEBOOK_CLIENT_ID;
const facebookSecret = process.env.FACEBOOK_SECRET;
const googleMapApiKey = process.env.GOOGLE_MAP_KEY;

module.exports = {
    'facebookAuth' : {
        'clientID': facebookClientID,
        'clientSecret': facebookSecret,
        'callbackURL': `http://${host}:${port}/account/facebook/callback`
    },
    'googleAuth' : {
        'clientID': '',
        'clientSecret': '',
        'callbackURL': `http://${host}:${port}/auth/google/callback`
    },
	'googleMaps' : {
		'apiKey' : googleMapApiKey,
		'url' : 'https://maps.googleapis.com/maps/api/geocode/json?'
	}
};