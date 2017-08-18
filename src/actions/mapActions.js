export function mapLoaded(map) {
    return {
        type: "MAP_LOADED",
        payload: map
    }
}

export function mapMoved(map) {
    return {
        type: "MAP_MOVED",
        payload: map
    }
}

export function openActivity(activity) {
    return {
        type: "OPEN_ACTIVITY",
        payload: activity
    }
}

export function onMarkerClick(activity) {
    return {
        type: "ON_MARKER_CLICK",
        payload: activity
    }
}

export function onMarkerClose(activity) {
    return {
        type: "ON_MARKER_CLOSE",
        payload: activity
    }
}

export function zoomChanged(map) {
    return {
        type: "ZOOM_CHANGED",
        payload: map
    }
}

export function setActivities(activities) {
    return {
        type: "SET_ACTIVITIES",
        payload: activities
    }
}