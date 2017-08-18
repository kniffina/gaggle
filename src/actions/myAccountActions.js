import axios from "axios";
var vars = require('../utils/vars.js');
var DOMAIN = vars.DOMAIN;

//call the endpoint
export function editAccountRequest(formData) {
		
		var user = formData.user;
		var old_email = user.email; //get old email
		var old_photo = user.facebook.photo; //get old email
		var old_first_name = user.facebook.firstName;
		var old_last_name = user.facebook.lastName;
	      
		var url = `${DOMAIN}/api/user/${user.id}`
		
		var req = {};
		  
		if(old_email != formData.email) {
			req.email = formData.email;
		}
		if(old_first_name != formData.first_name || old_last_name != formData.last_name
		 || old_photo != formData.photo) {
			 req.facebook = {};
		}
		
		if(old_first_name != formData.first_name) {
			req.facebook.firstName = formData.first_name;
		}
		if(old_last_name != formData.last_name) {
			req.facebook.lastName = formData.last_name
		}
		if(old_photo != formData.photo) {
			req.facebook.photo = formData.photo
		}
		if(formData.newPassword.length > 5) {
			req.password = formData.newPassword;
		}
		
		console.log("req out");
		console.log(req);
		
		return axios.put(url, req, {
			auth: {
				username: old_email,
				password: formData.password
			},
        })
}