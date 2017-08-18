import React, { Component } from "react";
import {connect} from 'react-redux';
import Map from "./Map";
import { toggleMap, openActivity, setActivityListVars } from "../../../../actions/activitiesActions";

require("../../../../../public/stylesheets/style.css");


class ActivitiesList extends Component {

    componentDidMount() {
        console.log("*** In ActivityList ComponentDidMount");
        console.log(this.props);
    }

    prevent(e) {
        e.preventDefault();
    }

    render() {
        if(this.props.activities === undefined) {
            const activitiesList = <h2>Error!!!</h2>

        }else {
            const activitiesList = this.props.activities.map((activity) =>
                <div key={activity.id}>
                    <a value={activity} onClick={this.prevent.bind(this)}
                       onDoubleClick={() => this.props.openActivity(activity)} href="#"
                       className="list-group-item list-group-item-action flex-column">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                <h4 key={activity.id}>{activity.title}</h4>
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3">
                                <h5>{activity.date_happening}</h5>
                            </div>
                            <div className="col-lg-7 col-md-7 col-sm-6 col-xs-6">
                                <h5>{activity.short_description}</h5>
                            </div>
                        </div>
                    </a>
                </div>
            );
        }
        //const googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.27&libraries=places,geometry&key=AIzaSyDtPmI1AX--RNjNs2h7Nd79do-iRiVgA64";


        return (
            <div className="activitiesMarginTop">
                {!this.props.showMap ? <div>
                    <button onClick={this.props.toggleMap} className="btn btn-default button_margin_bottom">Map View</button>
                    {activitiesList}
                </div> : null }

                { this.props.showMap ? <div>
                    <button onClick={this.props.toggleMap} className="btn btn-default button_margin_bottom">List View</button>
                    <Map
                        center={{lat: 40.728199, lng: -73.9894738}}
                        zoom={12}
                        containerElement={<div style={{height: "500px", marginBottom: "30px" }} className="col-lg-12 col-md-12 col-sm-12 col-xs-12" /> }
                        mapElement={<div style={{height: "500px"}} className="col-lg-12 col-md-12 col-sm-12 col-xs-12"/> }
                        markers={this.props.markers}

                    />

                </div> : null }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        activities: state.chooseDestinationReducer.activities,
        location: state.location,
        showMap: state.activityList.showMap,
        markers: state.activityList.markers
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleMap: () => dispatch(toggleMap()),
        openActivity: (activity) => dispatch(openActivity(activity)),
        setActivityListVars: (storeState) => dispatch(setActivityListVars(storeState))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesList);