
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



export function setMarkersActivities(props) {
    return {
        type: "SET_MARKERS",
        payload: props
    }
}

export function resetAllState() {
    return {
        type: "RESET_ALL_STATE",
        payload: null
    }

}