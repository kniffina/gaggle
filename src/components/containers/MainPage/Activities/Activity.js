import React, { Component } from "react";
import {connect} from 'react-redux';
import { Link, browserHistory } from "react-router";

require("../../../../../public/stylesheets/style.css");


class Activity extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activity: this.props.location.state.activity
        }
        this.backToMain = this.backToMain.bind(this);
    }

    backToMain() {
        browserHistory.push({
            pathname: "/main-page",
            state: { tab: 0 }
        });
    }




    render() {

        return (
            <div>
                <h1>{this.state.activity.title}</h1>

                <button onClick={this.backToMain} className="btn btn-default">Back</button>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {

    }
}


export default connect(mapStateToProps)(Activity);



