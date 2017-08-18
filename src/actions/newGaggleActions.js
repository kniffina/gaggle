export function setVariables(event) {
    return {
        type: "SET_VARIABLES",
        payload: event
    }
}

export function findLocation(params) {
    return {
        type: "FIND_LOCATION",
        payload: params
    }
}

export function checkErrors(params) {
    return {
        type: "CHECK_ERRORS",
        payload: params
    }
}

export function handleDate(date) {
    return {
        type: "HANDLE_DATE",
        payload: date
    }
}

export function resetAllState() {
    return {
        type: "RESET_ALL_STATE",
        payload: null
    }

}



