import React, { Component } from "react";
import {connect} from 'react-redux';
import Map from "./Map";
import { setMarkersActivities, toggleMap, openActivity, setActivityListVars } from "../../../../actions/activitiesActions";

require("../../../../../public/stylesheets/style.css");


class ActivitiesList extends Component {

    componentWillMount() {
        console.log("\n*** In ActivityList ComponentDidMount  BEFORE *****\n");
        console.log(this.props);

        this.props.setMarkersActivities(this.props);

        console.log("\n*** In ActivityList ComponentDidMount  AFTER *****\n");
        console.log(this.props);


    }

    prevent(e) {
        e.preventDefault();
    }

    render() {
        let activitiesList = null;
        if(this.props.activities === undefined) {
            activitiesList = <h2>Error!!!</h2>

        }else {
            activitiesList = this.props.activities.map((activity) =>
                <div key={activity.marker.id}>
                    <a value={activity} onClick={this.prevent.bind(this)}
                       onDoubleClick={() => this.props.openActivity(activity)} href="#"
                       className="list-group-item list-group-item-action flex-column">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                                <h4>{activity.title}</h4>
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-3 col-xs-3">
                                <h5>{activity.body}</h5>
                            </div>
                            <div className="col-lg-7 col-md-7 col-sm-6 col-xs-6">
                                <h5>{activity.date}</h5>
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
                        center={this.props.centerOfMap}
                        zoom={14}
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
        location: state.chooseDestinationReducer.location,
        showMap: state.activityList.showMap,
        markers: state.activityList.markers,
        centerOfMap: state.chooseDestinationReducer.centerOfMap
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        toggleMap: () => dispatch(toggleMap()),
        openActivity: (activity) => dispatch(openActivity(activity)),
        setMarkersActivities: (props) => dispatch(setMarkersActivities(props))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesList);