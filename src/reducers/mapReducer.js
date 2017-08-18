import React from "react";
import { browserHistory } from "react-router";
import { store, dispatch } from "react-redux";


const mapReducer = (state = {
    map: null,
    showInfo: false,
    activities: [],
    centerOfMap: {},

}, action) => {
    switch (action.type) {
        case "MAP_LOADED":
            if (action.payload === null) {
                console.log("map is null");
            }
            else {
                if (action.payload !== null) {
                    return Object.assign({}, state, {
                        map: action.payload,
                        activities: state.activities
                    });
                }
            }
            break;

        case "ZOOM_CHANGED":
            console.log("Zoom Changed: " + JSON.stringify(action.payload.getCenter()));

            //get activities again
            break;

        case "MAP_MOVED":
            console.log("Map Moved: " + JSON.stringify(action.payload.getCenter()));

            //get activities again

            break;

        case "OPEN_ACTIVITY":
            browserHistory.push({
                pathname: "/activity",
                state: {activity: action.payload}
            });
            break;

        case "ON_MARKER_CLICK":
            console.log(action.payload);
            action.payload.marker.showInfo = !action.payload.marker.showInfo;

            return Object.assign({}, state, {
               activities: Object.assign({}, state, {
                   marker: Object.assign({}, state, {
                       showInfo: !state.showInfo
                   })
               })
            });


        case "ON_MARKER_CLOSE":
            action.payload.marker.showInfo = false;

            return Object.assign({}, state, {
                showInfo: false
            });


        case "RESET_ALL_STATE":
            return Object.assign({}, state, {
                map: null,
                showInfo: false,
                activities: [],
                centerOfMap: {},
            });

        case "SET_ACTIVITIES":
            console.log("********************\n****************\n");
            return Object.assign({}, state, {
                activities: action.payload.activities,

            });
    }
    return state;
};

export default mapReducer;