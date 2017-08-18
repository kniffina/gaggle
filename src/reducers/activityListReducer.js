import React from "react";
import { browserHistory } from "react-router";
import { geocodeByAddress } from "react-places-autocomplete";

const activityListReducer = (state = {
    showMap: true,
    location: "",
    centerOfMap: {},
    activities: [],
    markers: []
}, action) => {
    switch(action.type) {
        case "TOGGLE_MAP":
            return Object.assign({}, state, {
                showMap: !state.showMap
            });

        case "OPEN_ACTIVITY":
            browserHistory.push({
                pathname: "/activity",
                state: {activity: action.payload}
            });
            break;

        case "SET_MARKERS":
            let setMarkers = [];
            for(let i = 0; i < action.payload.activities.length; i++) {
                setMarkers[i] = {};
                setMarkers[i] = action.payload.activities[i].marker;
            }

            return Object.assign({}, state, {
                markers: setMarkers,
                activities: action.payload.activities,
                centerOfMap: action.payload.centerOfMap,
                location: action.payload.location
            });

        case "RESET_ALL_STATE":
            return Object.assign({}, state, {
                showMap: true,
                location: "",
                centerOfMap: {},
                activities: [],
                markers: []
            });


            break;

    }
    return state;

};

export default activityListReducer;