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

        case "SET_ACTIVITIES_CHOOSE_DESTINATION":
            let newActivities = [];
            let counter = 0;
            let centerOnFirst = 0;
            let center = {};

            for(let i = 0; i < action.payload.length; i++) {
                if (action.payload[i].location === undefined) {
                    if(counter === 0) {
                        counter = 0;
                    }
                    else {
                        counter = newActivities.length;
                    }
                }
                else {
                    if (centerOnFirst === 0) {
                        center = {
                            lat: action.payload[i].location.loc[1],
                            lng: action.payload[i].location.loc[0]
                        };
                        centerOnFirst++;
                    }

                    newActivities[counter] = {};
                    newActivities[counter] = action.payload[i];
                    newActivities[counter].marker = {
                        id: counter,
                        position: {
                            lat: action.payload[i].location.loc[1],
                            lng: action.payload[i].location.loc[0],
                        },
                        title: action.payload[i].body,
                        showInfo: false
                    };
                    counter++;
                }
            }
            console.log("*** new activities ***", newActivities);
            //if no activities just reset state
            if(newActivities.length <= 0) {
                alert("No activities found for that location");
                return Object.assign({}, state, {
                    date: "",
                    location: "",
                    errors: {},
                    activities: [],
                    centerOfMap: {},
                    sendToMain: false,
                    pushBrowser: false,
                });
            }
            else {
                console.log("** AFTER SETTING NEW ACTIVITIES", newActivities);
                return Object.assign({}, state, {
                    activities: newActivities,
                    errors: {},
                    pushBrowser: true,
                    centerOfMap: center
                });
            }


        case "RESET_BROWSER":
            browserHistory.push({
                pathname: "/main-page",
                state: {
                    tab: 0
                }
            });
            return Object.assign({
                pushBrowser: false,
                sendToMain: false,
                errors: {},
                activities: state.activities,
                tab: 0,
                centerOfMap: state.centerOfMap,
                location: state.location
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
                pathname: "/main-page",
                state: {
                    tab: 1
                }
            });

            break;

        case "RESET_ALL_STATE":
            return Object.assign({}, state, {
                date: "",
                location: "",
                errors: {},
                activities: [],
                centerOfMap: {},
                sendToMain: false,
                pushBrowser: false,
                tab: 0,
            });
    }

    return state;
};

export default chooseDestinationReducer;
