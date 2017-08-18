import React, {Component} from "react";
import {connect} from "react-redux";
import { loginUser, loginUserWithFacebook } from "../../../actions/loginPageActions";
import { browserHistory } from "react-router"
var loginActions = require("../../../actions/loginPageActions");


class LandingPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password:"",
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.login = this.login.bind(this);
        this.loginWithFacebook = this.loginWithFacebook.bind(this);
        this.sendToRegister = this.sendToRegister.bind(this);
    }

    sendToRegister() {
        browserHistory.push({
            pathname: '/register'
        });
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
            this.setState({errors: { email: "You must provide a valid email to login"}});
        }
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        //if user is making changes again, set errors to nothing (except the email error)
        this.setState({errors: { email: this.state.errors.email} });
    }

    checkErrors(e) {
        console.log(e, "login");

        var errorCount = 0;
        var newErrors = {};

        if(this.state.errors.email === "You must provide a valid email to login") {
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

        if(this.state.password === "") {
            newErrors.password = "This field is required";
            errorCount++;
        }
        else if(this.state.password.length <= 5) {
            newErrors.password = "Your password is at least 6 characters long";
            errorCount++;
        }

        if(errorCount > 0) {
            newErrors.totalErrors = "You have " + errorCount + " error(s) that you need to fix to login";
            this.setState({ errors: newErrors });
            return false;
        }
        else {
            return true;
        }
    }

    login(e) {
        var credentials = {
            email: this.state.email,
            password: this.state.password
        }

        var proceed = this.checkErrors(e);

        if(proceed === true) {
			loginActions.login(this.state.email, this.state.password).then((res) => {
				if (res.data.results.token != null) {
				
					localStorage.setItem('token', JSON.stringify(res.data.results.token));
					localStorage.setItem('user', JSON.stringify(res.data.results.user));

					//https://stackoverflow.com/questions/34119793/react-router-redirection-after-login
					browserHistory.push('/choose-destination');
				} else {
					alert("Invalid Credentials");
				}
			})
			.catch(err => {
				console.log(err);
                    alert("Invalid Credentials");
			})
		}
	}

    loginWithFacebook(e) {
        console.log(e, "facebook login");

		loginActions.loginUserWithFacebook()
			.then(response => {
				console.log("LOGIN WITH FACEBOOK " + JSON.stringify(response))
				
				if (res.token !== null) {
					localStorage.setItem('token', JSON.stringify(res.data.results.token));
					localStorage.setItem('user', JSON.stringify(res.data.results.user));
					
					browserHistory.push('/choose-destination');
				} else {
					alert("Oops something went wrong");
				}
			})
			.catch(err => {
				alert(err.message);
			});

    }

    render() {
        const { errors } = this.state;
		const backgroundStyle = { 
			backgroundImage: "url('../../../../GLogo(M).png')",
			'backgroundRepeat': 'no-repeat',
			'backgroundSize:': '500px Auto',
			'minHeight': '500px',
			'marginLeft': '50px'
		}
		
        return (
		<div style={backgroundStyle}>
            <div className="text_align_center_class container vertical_align">
                <div className="row">
                    <div style={{"paddingTop":"50px"}} className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                        <h1>Gaggle</h1>
                        <h4>The most comprehensive application for finding people like YOU who love to travel and do things together!</h4>
                        { errors.totalErrors && <h4 className="help-block landingTotalErrors">{errors.totalErrors}</h4> }
                    </div>
                </div>

                <form>
                    <div className="row">
                        <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <span><input value={this.props.email} onChange={this.validateEmail} name="email" type="text" className="form-control" id="formGroupExampleInput" placeholder="Email"></input></span>
                            { errors.email && <span className="help-block errorField">{errors.email}</span> }
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <span><input value={this.props.password} onChange={this.onChange} name="password" type="password" className="form-control" id="formGroupExampleInput2" placeholder="Password"></input></span>
                            { errors.password && <span className="help-block errorField">{errors.password}</span> }
                        </div>
                </div>
            </form>
                <div className="row">
                    <div className="text_align_center_class form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                        <button onClick={this.loginWithFacebook} className="btn btn-primary">Login with Facebook</button>
                        <button onClick={this.login} type="submit" id="loginNormalButton" className="btn btn-success col-offset-3">Login</button>
                    </div>
                </div>
                <div className="row">
                    <div className="text_align_center_class col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                        <h3>Not a Member?</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="register_button_padding_bottom text_align_center_class col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                        <button onClick={this.sendToRegister} className="btn btn-default ">Register</button>
                    </div>
                </div>
            </div>
		</div>
        );
    }

}


const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (params) => dispatch(loginUser(params)),
        loginUserWithFacebook: params => dispatch(loginUserWithFacebook(params))
    };
};

export default connect(null, mapDispatchToProps)(LandingPage);