

import React, {Component} from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { userSignupRequest } from "../../../actions/registrationActions";



require("../../../../public/stylesheets/style.css");



class UserRegistrationForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            first_name: "",
            last_name: "",
            username: "",
            password: "",
            confirm_password: "",
            errors: {}
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });

        //if user is making changes again, set errors to nothing (except the email error)
        this.setState({errors: { email: this.state.errors.email} });
    }

    validateEmail(e) {
        e.preventDefault();
        this.state.email = e.target.value;
        this.setState({
            email: this.state.email
        });

        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(re.test(this.state.email)) {
            //need spread operator probably to show all errors
            this.setState({ errors: {} });
        }
        else {
            this.setState({errors: { email: "You must provide a valid email to register"}});
        }
    }

    onSubmit(e) {
        e.preventDefault();

        var newErrors = {};
        var errorCount = 0;

        if(this.state.errors.email === "You must provide a valid email to register") {
            newErrors.email = "You must provide a valid email to register";
            errorCount++;
        }

        //set errors to empty and recheck
        this.setState({errors: {}});


        //check errors for email
        if(this.state.email === "") {
            newErrors.email = "This field is required";
            errorCount++;
        }

        //check errors for first name
        if(this.state.first_name === "") {
            newErrors.first_name = "This field is required";
            errorCount++;
        }
		
		//check errors for last name
        if(this.state.last_name === "") {
            newErrors.last_name = "This field is required";
            errorCount++;
        }

        //check errors for username
        if(this.state.username === "") {
            newErrors.username = "This field is required";
            errorCount++;
        }

        //check errors for password
        if(this.state.password === "") {
            newErrors.password = "This field is required";
            errorCount++;
        }
        else if(this.state.password.length <= 5) {
            newErrors.password = "Your password must be at least 6 characters long";
            errorCount++;
        }

        if(this.state.confirm_password === "") {
            newErrors.confirm_password = "This field is required";
            errorCount++;
        }
        else if(this.state.password != this.state.confirm_password) {
            newErrors.confirm_password = "This must match your entered password. Please correct the error";
            errorCount++;
        }

        if(errorCount > 0) {
            newErrors.totalErrors = "You have " + errorCount + " error(s) that must be fixed before you can register";
            this.setState({ errors: newErrors });
        }
        else {
            //send to the api to sign up the user.
           userSignupRequest(this.state)
		   .then((res) => {
			   console.log(res);
				if (res.data.message.results.token != null) {
				
					localStorage.setItem('token', JSON.stringify(res.data.message.results.token));
					localStorage.setItem('user', JSON.stringify(res.data.message.results.user));

					//https://stackoverflow.com/questions/34119793/react-router-redirection-after-login
					browserHistory.push('/choose-destination');
				} else {
					alert("Oops something went wrong");
				}  
		   })
		   	.catch(err => {
				console.log(err);
                    alert("Oops something went wrong");
			})
        }
    }


    render() {
        const { errors } = this.state;
        return (
            <div>
                { errors.totalErrors && <h4 className="help-block totalErrors">{errors.totalErrors}</h4> }
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <span><input onChange={this.validateEmail} value={this.state.email} name="email" type="text" className="form-control has-success" id="registration_email" placeholder="Email"></input></span>
                            { errors.email && <span className="help-block errorField">{errors.email}</span> }
                        </div>

                    </div>

                    <div className="row">
                        <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <span><input onChange={this.onChange} value={this.state.first_name} name="first_name" type="text" className="form-control" id="registration_firstname" placeholder="First Name"></input></span>
                            { errors.first_name && <span className="help-block errorField">{errors.first_name}</span> }
                        </div>
                    </div>
					
					<div className="row">
                        <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <span><input onChange={this.onChange} value={this.state.last_name} name="last_name" type="text" className="form-control" id="registration_lastname" placeholder="Last Name"></input></span>
                            { errors.last_name && <span className="help-block errorField">{errors.last_name}</span> }
                        </div>
                    </div>


                    <div className="row">
                        <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <span><input onChange={this.onChange} value={this.state.username} name="username" type="text" className="form-control" id="registration_username" placeholder="Desired Username"></input></span>
                            { errors.username && <span className="help-block errorField">{errors.username}</span> }
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <span><input onChange={this.onChange} value={this.state.password} name="password" type="password" className="form-control" id="registration_password" placeholder="Password"></input></span>
                            { errors.password && <span className="help-block errorField">{errors.password}</span> }
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <span><input onChange={this.onChange} value={this.state.confirm_password} name="confirm_password" type="password" className="form-control" id="registration_confirm_password" placeholder="Confirm Password"></input></span>
                            { errors.confirm_password && <span className="help-block errorField">{errors.confirm_password}</span> }
                        </div>
                    </div>

                    <div className="row">
                        <div className="register_button_padding_bottom text_align_center_class col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <button type="submit" className="btn btn-default ">Register</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default UserRegistrationForm;