var axios = require('axios')
var vars = require('../utils/vars.js');
var DOMAIN = vars.DOMAIN;

export function getActivities(location) {
    let url = `${DOMAIN}/api/event`;

    return function(dispatch) {
        //dispatch(getData(location))

        return axios.get(url, location)
            .then(
                response => dispatch(setStateVariables(response)),
                error => console.log("error")
            )
    }
}

export function setStateVariables(data) {
    return {
        type: "SET_ACTIVITIES",
        payload: data.data.results
    }
}

export function resetBrowser() {
    return {
        type: "RESET_BROWSER",
        payload: null
    }
}

export function checkDestinationErrors(params) {
    return {
        type: "CHECK_DESTINATION_ERRORS",
        payload: params
    }
}

export function setLocation(params) {
    return {
        type: "FIND_LOCATION",
        payload: params
    }
}

export function handleDate(date) {
    return {
        type: "HANDLE_DATE",
        payload: date
    }
}

export function onChange(event) {
    return {
        type: "ON_CHANGE",
        payload: event
    }
}

export function sendToNewGaggle() {
    return {
        type: "SEND_TO_NEW_GAGGLE",
        payload: null
    }
}

