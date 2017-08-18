import React, { Component } from "react";
import {connect} from 'react-redux';
import { Link, browserHistory } from "react-router";
import Navbar from "../../../containers/Navbar/Navbar";

require("../../../../../public/stylesheets/style.css");


class Activity extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activity: this.props.location.state.activity
        }
        this.backToMain = this.backToMain.bind(this);
        console.log(this.state);
    }

    backToMain() {
        browserHistory.push({
            pathname: "/main-page",
            state: { tab: 0 }
        });
    }




    render() {

        return (

            <div className="container">
                <Navbar />

                <div className="row">
                    <div className="panel panel-heading margin_top col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                        <h1 className="panel panel-heading">{this.state.activity.title}</h1>
                        <br />

                        <h4>{this.state.activity.body}</h4>
                        <br />

                        <h4>{this.state.activity.date}</h4>
                        <br />

                        <button onClick={this.backToMain} className="panel panel-default btn btn-default">Back</button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {

    }
}


export default connect(mapStateToProps)(Activity);



