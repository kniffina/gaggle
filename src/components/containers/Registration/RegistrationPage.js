import React, { Component } from "react";
import UserRegistrationForm from "./UserRegistrationForm";
import { connect } from "react-redux";
import { userSignupRequest } from "../../../actions/registrationActions";

require("../../../../public/stylesheets/style.css");


class RegistrationPage extends Component {
    render() {
        const { userSignupRequest } = this.props;

        return (
            <div className="text_align_center_class container small_vertical_align">
                <div className="row">
                    <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                        <h1>Register for Gaggle</h1>
                    </div>
                </div>
                <UserRegistrationForm userSignupRequest={userSignupRequest} />

            </div>
        );
    }
}


export default connect(null, { userSignupRequest })(RegistrationPage);

