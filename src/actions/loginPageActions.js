var axios = require('axios')
var vars = require('../utils/vars.js');
var DOMAIN = vars.DOMAIN;


var headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/x-www-form-urlencoded',
  'Cache-Control': 'no-cache'
};

var loginPageActions = {
	
	loginUserWithFacebook() {
		var url = `${DOMAIN}/account/facebook`
		
		return axios.get(url, {})
	},
	
	 /**
     * Login user to get initial data and token
     */
    login(email, password) {
        email = email.toLowerCase().trim();
        var url = `${DOMAIN}/account/login`;

        return axios.post(url, null, {
            //headers: headers,
            auth: {
				username: email,
				password: password
			},
        })
	},
	
    /**
     * Get User profile for profile/setting page
     */
    getUser(userId) {
        var url = `${DOMAIN}/account/currentuser`;

        return axios.get(url, {
             auth: {
				username: email,
				password: password
			},
        })
    },
}

module.exports = loginPageActions;