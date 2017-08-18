import React, {Component} from "react";
import { browserHistory } from "react-router";
import { connect } from "react-redux";
import { editAccountRequest } from "../../../actions/myAccountActions";

require("../../../../public/stylesheets/style.css");


class MyAccountForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            first_name: "",
            last_name: "",
            username: "",
			joinDate: "",
            password: "",
			newPassword: "",
            confirm_password: "",
            errors: {},
			user: {},
			token: "",
			photo: 'https://pbs.twimg.com/media/CfHNfbcW8AQK1eh.jpg'
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
    }
	
	componentWillMount() {
		var token = JSON.parse(localStorage.getItem('token'));
		var user = JSON.parse(localStorage.getItem('user'));
		var d = user.joinDate.substr(0,10);
		
		console.log(user);
		this.setState({ user: user});		
		this.setState({ token: token});
		
		this.setState({email: user.email});
		this.setState({first_name: user.facebook.firstName});
		this.setState({last_name: user.facebook.lastName});
		this.setState({username: user.username});
		this.setState({photo: user.facebook.photo == "" ? 'https://pbs.twimg.com/media/CfHNfbcW8AQK1eh.jpg' : user.facebook.photo});
		
		this.setState({joinDate: d});
		this.setState({password: ""});
		this.setState({confirm_password: ""});
		this.setState({errors: {}});
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
		this.onChange(e);

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
		
		//check old password
        if(this.state.password === "") {
            newErrors.password = "Current password required to make changes to your account";
            errorCount++;
        }
		
        if(this.state.newPassword.length > 0 && this.state.newPassword.length <= 5) {
            newErrors.newPassword = "Your password must be at least 6 characters long";
            errorCount++;
        }

        if(this.state.newPassword.length > 0 && this.state.confirm_password === "") {
            newErrors.confirm_password = "This field is required";
            errorCount++;
        }
        else if(this.state.newPassword != this.state.confirm_password) {
            newErrors.confirm_password = "This must match your entered password. Please correct the error";
            errorCount++;
        }

        if(errorCount > 0) {
            newErrors.totalErrors = "You have " + errorCount + " error(s) that must be fixed before you can register";
            this.setState({ errors: newErrors });
        }
        else {
            //send to the api to sign up the user.
           editAccountRequest(this.state)
		   .then((res) => {
			   console.log(res);
				if (res.data.confirmation == 'success') {
					var u = res.data.message;
					localStorage.setItem('user', JSON.stringify(u));
					var d = u.joinDate.substr(0,10);
					
					this.setState({user: u});
				
					this.setState({email: u.email});
					this.setState({first_name: u.facebook.firstName});
					this.setState({last_name: u.facebook.lastName});
					this.setState({username: u.username});
					this.setState({photo: u.facebook.photo});
					this.setState({joinDate: d});
					this.setState({password: ""});
					this.setState({confirm_password: ""});
					this.setState({errors: {}});

					
					alert("Account updated successfully");
					
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
			<img src={this.state.photo} height="150px" width="150px" />
			<br />
			<br />
                { errors.totalErrors && <h4 className="help-block totalErrors">{errors.totalErrors}</h4> }
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <span>Email: <input onChange={this.validateEmail} value={this.state.email} name="email" type="text" className="form-control has-success" id="email" placeholder="Email"></input></span>
                            { errors.email && <span className="help-block errorField">{errors.email}</span> }
                        </div>

                    </div>

                    <div className="row">
                        <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <span>First Name: <input onChange={this.onChange} value={this.state.first_name} name="first_name" type="text" className="form-control" id="firstname" placeholder="First Name"></input></span>
                            { errors.first_name && <span className="help-block errorField">{errors.first_name}</span> }
                        </div>
                    </div>
					
					<div className="row">
                        <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <span>Last Name: <input onChange={this.onChange} value={this.state.last_name} name="last_name" type="text" className="form-control" id="lastname" placeholder="Last Name"></input></span>
                            { errors.last_name && <span className="help-block errorField">{errors.last_name}</span> }
                        </div>
                    </div>


                    <div className="row">
                        <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <span>Username: <input onChange={this.onChange} value={this.state.username} name="username" type="text" className="form-control" id="username" placeholder="Username" readOnly></input></span>
                            { errors.username && <span className="help-block errorField">{errors.username}</span> }
                        </div>
                    </div>
					
					<div className="row">
                        <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <span>Join Date: <input onChange={this.onChange} value={this.state.joinDate} name="joinDate" type="text" className="form-control" id="joinDate" placeholder="Join Date" readOnly></input></span>
                        </div>
                    </div>

					<div className="row">
                        <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <span>Photo URL: <input onChange={this.onChange} value={this.state.photo} name="photo" type="text" className="form-control" id="photo" placeholder="Photo URL"></input></span>
                        </div>
                    </div>
					
                    <div className="row">
                        <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <span>Current Password: <input onChange={this.onChange} value={this.state.password} name="password" type="password" className="form-control" id="password" placeholder="Current Password"></input></span>
                            { errors.password && <span className="help-block errorField">{errors.password}</span> }
                        </div>
                    </div>
					
					<div className="row">
                        <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <span>New Password: <input onChange={this.onChange} value={this.state.newPassword} name="newPassword" type="password" className="form-control" id="newPassword" placeholder="New Password"></input></span>
                            { errors.newPassword && <span className="help-block errorField">{errors.newPassword}</span> }
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <span>Confirm New Password: <input onChange={this.onChange} value={this.state.confirm_password} name="confirm_password" type="password" className="form-control" id="registration_confirm_password" placeholder="Confirm New Password"></input></span>
                            { errors.confirm_password && <span className="help-block errorField">{errors.confirm_password}</span> }
                        </div>
                    </div>

                    <div className="row">
                        <div className="register_button_padding_bottom text_align_center_class col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <button type="submit" className="btn btn-default ">Update Account</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default MyAccountForm;