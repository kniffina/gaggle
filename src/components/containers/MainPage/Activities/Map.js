import React, { Component } from "react";
import { InfoWindow, withGoogleMap,GoogleMap, Marker } from "react-google-maps";
import {browserHistory} from "react-router";
import { mapLoaded, mapMoved, openActivity, onMarkerClick, onMarkerClose, zoomChanged, setActivities } from "../../../../actions/mapActions";
import { connect } from 'react-redux';

class Map extends Component {

    componentWillMount() {

        console.log(this.props);
    }

    render() {
        if (this.props.activities === undefined) {
            return <h3>Error</h3>;
        }
        else {
            return (
                <GoogleMap
                    ref={this.props.mapLoaded}
                    onZoomChanged={() => this.props.zoomChanged(this.props.map)}
                    onDragEnd={() => this.props.mapMoved(this.props.map)}
                    defaultZoom={this.props.zoom}
                    defaultCenter={this.props.center}
                >
                    {this.props.activities.map((activity, index) => (
                            <Marker
                                {...activity.marker}
                                key={activity.id}
                                onClick={() => this.props.onMarkerClick(activity)}
                            >
                                { activity.marker.showInfo ?
                                    <InfoWindow
                                        onCloseClick={() => this.props.onMarkerClose(activity)}
                                    >
                                        <div width="100px" height="60px">
                                            <a onClick={() => this.props.openActivity(activity)} href="#">
                                                <h5>{activity.title}</h5>
                                            </a>
                                            <p>{activity.description}</p>

                                        </div>
                                    </InfoWindow> : null }
                            </Marker>
                        )
                    )}

                </GoogleMap>
            );
        }
    }
}
//<p>{activity.hour_start} - {activity.hour_end} on {activity.date_happening}</p>
const mapStateToProps = (state) => {
    return {
        activities: state.chooseDestinationReducer.activities,
        map: state.mapReducer.map,
        showInfo: state.mapReducer.showInfo
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        mapLoaded: (map) => dispatch(mapLoaded(map)),
        mapMoved: (map) => dispatch(mapMoved(map)),
        openActivity: (activity) => dispatch(openActivity(activity)),
        onMarkerClick: (activity) => dispatch(onMarkerClick(activity)),
        onMarkerClose: (activity) => dispatch(onMarkerClose(activity)),
        zoomChanged: (map) => dispatch(zoomChanged(map)),
        setActivities: (activities) => dispatch(setActivities(activities))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withGoogleMap((Map)));