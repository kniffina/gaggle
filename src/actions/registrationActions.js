import axios from "axios";
var vars = require('../utils/vars.js');
var DOMAIN = vars.DOMAIN;

//call the endpoint
export function userSignupRequest(formData) {
		var url = `${DOMAIN}/api/user`;
		
		var params = new URLSearchParams();
		params.append('username', formData.username);
		params.append('email', formData.email);
		params.append('password', formData.password);
		params.append('facebook.firstName', formData.first_name);
		params.append('facebook.lastName', formData.last_name);
		params.append('signIn', 'true'); //requests jwt
			
		return axios.post(url, params)
}