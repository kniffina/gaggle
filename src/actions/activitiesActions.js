
export const getActivities = () => {
    return {
        type: "GET_ACTIVITIES",
        payload: null
    }
};

export function toggleMap() {
    return {
        type: "TOGGLE_MAP",
        payload: null
    }
}

export function openActivity(activity) {
    return {
        type: "OPEN_ACTIVITY",
        payload: activity
    }
}

export function setLocation(location) {
    return {
        type: "SET_LOCATION",
        payload: location
    }
}

export function setActivityListVars(params) {
    return {
        type: "SET_ACTIVITY_VARS",
        payload: params
    }
}