import React, {Component} from "react";
import { browserHistory} from "react-router"
import {connect} from "react-redux";
import { Link } from "react-router";
require("../../../../public/stylesheets/style.css");


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.sendToAccount = this.sendToAccount.bind(this);
        this.gaggle = this.gaggle.bind(this);
    }

    logout(e) {
        console.log('Destroying token');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        browserHistory.push('/');
    }

    gaggle(e) {
      browserHistory.push('/choose-destination')
    }

    //send the user object to the account info page
    sendToAccount(user) {
        console.log(user);

        browserHistory.push({
            pathname: '/my-account',
            state: {
                userInfo: user
            }
        })
    }

    render() {
        var user = JSON.parse(localStorage.getItem('user'));

        return (
            <div className="navbar_padding">
                <div className="row">
                    <div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
                    </div>

                    <div className="col-lg-5 col-md-5 col-sm-5 col-xs-5">
                        <a onClick={this.gaggle} id="navbar_gaggle_text">Gaggle</a>
                    </div>
                    <div className="col-lg-3 col-md-2 col-sm-1 col-xs-0">
                    </div>

                    <div className="col-lg-3 col-md-4 col-sm-5 col-xs-6">
                        <p>Welcome {user.username}!</p>
                        <button onClick={() => this.sendToAccount(user)} className="btn btn-sm btn-default navbar_button">My Account</button>
                        <button onClick={this.logout} id="navbar_button_margin_left" className="btn btn-sm btn-default navbar_button">Logout</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    };
}

function componentWillMount() {
    var user = JSON.parse(localStorage.getItem('user'));
    if(user == null || user.username == null) browserHistory.push('/');
}

export default connect(mapStateToProps)(Navbar);