import React from "react";
import axios from "axios";
import { browserHistory } from "react-router";
var vars = require('../utils/vars.js');
var DOMAIN = vars.DOMAIN;
import { getEvents, get } from "../actions/chooseDestinationActions";
import { getActivities } from "../actions/chooseDestinationActions";


const chooseDestinationReducer = (state = {
    date: "",
    location: "",
    errors: {},
    activities: [],
    centerOfMap: {},
    sendToMain: false,
    pushBrowser: false,
    tab: 0
}, action) => {
    switch (action.type) {
        case "CHECK_DESTINATION_ERRORS":
            var newErrors = {};
            var errorCount = 0;

            Object.assign({}, state, {
                errors: {}
            });

            if(state.date === "" || state.date === null) {
                newErrors.date = "This field is required";
                errorCount++;
            }

            if(state.location === "") {
                newErrors.location = "This field is required";
                errorCount++;
            }

            if(errorCount > 0) {
                newErrors.totalErrors = "You have " + errorCount + " error(s) that must be fixed"
                return Object.assign({}, state, {
                    errors: newErrors
                });
            }
            else {
                return Object.assign({}, state, {
                    sendToMain: true
                });
            }
            break;

        case "SET_ACTIVITIES":
            var newActivities = [];

            for(var i = 0; i < action.payload.length; i++) {
                newActivities[i] = {};
                newActivities[i] = action.payload[i];
                if(action.payload[i].location === undefined) {
                    newActivities[i] = action.payload[i];
                }
                else {
                    newActivities[i].marker = {
                        id: i,
                        position: {
                            lat: action.payload[i].location.loc[0],
                            lng: action.payload[i].location.loc[1],
                        },
                        title: action.payload[i].body,
                        showInfo: false
                    };
                }
            }
            console.log("** AFTER SETTING NEW ACTIVITIES", newActivities);
            return Object.assign({}, state, {
                activities: newActivities,
                errors: {},
                pushBrowser: true
            });

            break;

        case "RESET_BROWSER":
            console.log("RESET", state.activities);

            browserHistory.push({
                pathname: "/main-page",
                // state: {
                //     tab: 0,
                //     activities: "fuck you"
                // }

            });
            return Object.assign({
                pushBrowser: false,
                sendToMain: false,
                errors: {},
                activities: state.activities,
                tab: 0
            });

        case "FIND_LOCATION":
            return Object.assign({}, state, {
                location: action.payload,
                errors: {}
            });
            break;

        case "HANDLE_DATE":
            return Object.assign({}, state, {
                date: action.payload,
                errors: {},

            });

        case "ON_CHANGE":
            return Object.assign({}, state, {
                [action.payload.target.name]: action.payload.target.value,
                errors: {}
            });

        case "SEND_TO_NEW_GAGGLE":
            browserHistory.push({
                pathname: '/main-page',
                state: {
                    tab: 1
                }
            });

            break;
    }

    return state;
};

export default chooseDestinationReducer;
