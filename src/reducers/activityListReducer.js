import React from "react";
import { browserHistory } from "react-router";
import { geocodeByAddress } from "react-places-autocomplete";

const activityListReducer = (state = {
    showMap: true,
    location: "",
    centerOfMap: {},
    activities: []
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

        case "SET_LOCATION":
            return Object.assign({}, state, {
               location: action.payload
            });

        case "SET_ACTIVITY_VARS":
            return Object.assign({}, state, {
                activities: action.payload.activities
            });
    }
    return state;

};

export default activityListReducer;