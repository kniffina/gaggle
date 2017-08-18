import React, { Component } from "react";
import Navbar from "../containers/Navbar/Navbar";
import Tabs from 'react-tabs-navigation';
import {connect} from 'react-redux';

import ActivitiesList from "../containers/MainPage/Activities/ActivitiesList";
import Chat from "../containers/MainPage/Chat";
import NewGaggle from "../containers/MainPage/NewGaggle/NewGaggle";

class MainPage extends Component {

    render() {
        return(
            <div className="container">
                <Navbar />
                <br />
                <br />
                <div className="row">
                    <div className="col-lg-10 col-lg-offset-1 col-md-10 col-md-offset-1 col-sm-10 col-sm-offset-1 col-xs-12">
                        <Tabs
                            selected={this.props.tab}
                            tabs={[
                                {
                                    children: () => (
                                        <ActivitiesList />
                                    ),
                                    displayName: 'Activities'

                                },
                                {
                                    children: () => (
                                        <NewGaggle />
                                    ),
                                    displayName: 'New Gaggle'
                                },
                                {
                                    children: () => (
                                        <Chat />
                                    ),
                                    displayName: 'Chat'
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps =(state) => {
    return {
        tab: state.tab,
        activities: state.activities
    }
};

export default connect(mapStateToProps)(MainPage);