import React, { Component } from "react";
import MyAccountForm from "./MyAccountForm";
import { connect } from "react-redux";
import { editAccountRequest } from "../../../actions/myAccountActions";
import Navbar from "../Navbar/Navbar";

require("../../../../public/stylesheets/style.css");


class MyAccountPage extends Component {
    render() {
        const { editAccountRequest } = this.props;

        return (
		    <div className="container">
                <Navbar />
                <br />
				<div className="text_align_center_class container small_vertical_align">
					<div className="row">
						<div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
							<h1>Account Settings</h1>
						</div>
					</div>
					<MyAccountForm editAccountRequest={editAccountRequest} />

				</div>
			</div>
        );
    }
}


export default connect(null, { editAccountRequest })(MyAccountPage);

