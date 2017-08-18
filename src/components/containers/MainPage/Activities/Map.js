import React, { Component } from "react";
import { InfoWindow, withGoogleMap,GoogleMap, Marker } from "react-google-maps";
import {browserHistory} from "react-router";
import { mapLoaded, mapMoved, openActivity, onMarkerClick, onMarkerClose, zoomChanged, setStateMap } from "../../../../actions/mapActions";
import { connect } from 'react-redux';

class Map extends Component {

    componentWillMount() {

        console.log(this.props);
        this.props.setStateMap(this.props);
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
                    defaultCenter={this.props.centerOfMap}
                >
                    {this.props.activities.map((activity, index) => (
                            <Marker
                                {...activity.marker}
                                key={activity.marker.id}
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
                                            <p>{activity.body}</p>
                                            <p>{activity.date}</p>

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

//{lat: -123.0350963, lng: 44.9428975}

const mapStateToProps = (state) => {
    return {
        activities: state.chooseDestinationReducer.activities,
        map: state.mapReducer.map,
        showInfo: state.mapReducer.showInfo,
        centerOfMap: state.chooseDestinationReducer.centerOfMap
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
        setStateMap: (props) => dispatch(setStateMap(props))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withGoogleMap((Map)));