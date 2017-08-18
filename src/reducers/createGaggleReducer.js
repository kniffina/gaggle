import React from "react";
import axios from "axios";
var vars = require('../utils/vars.js');
var DOMAIN = vars.DOMAIN;

const createGaggleReducer = (state = {
    author: "",
    members: [],
    title: "",
    body: "",
    img: "",
    date: "",
    location: "",
    imageLink: "",
    errors: {},
}, action) => {
    switch (action.type) {

        case "SET_VARIABLES":
            return Object.assign({}, state, {
                [action.payload.target.name]: action.payload.target.value,
                errors: {}
            });

        case "FIND_LOCATION":
            return Object.assign({}, state, {
                location: action.payload,
                errors: {}
            });

        case "HANDLE_DATE":
            return Object.assign({}, state, {
                date: action.payload,
                errors: {}
            });

        case "CHECK_ERRORS":
            var errorCount = 0;
            var newErrors = {};


            //action.payload is props from component
            if(action.payload.title === "") {
                newErrors.title = "This field is required";
                errorCount++;
            }

            if(action.payload.location === "") {
                newErrors.location = "This field is required";
                errorCount++;
            }

            if(action.payload.date === "") {
                newErrors.date = "This field is required";
                errorCount++;
            }

            if(action.payload.body === "") {
                newErrors.body = "This field is required";
                errorCount++;
            }

            if(errorCount > 0) {
                newErrors.totalErrors = "You have " + errorCount + " error(s) that must be fixed before you can create a New Gaggle";
                return Object.assign({}, state, {
                    errors: newErrors
                });
            }
            else {
                let url = `${DOMAIN}/api/event`;
                let params = new URLSearchParams();

                params.append("destination", state.location);
                params.append("author", state.author);
                params.append("isPrivate", state.isPrivate);
                params.append("members", state.members);
                params.append("title", state.title);
                params.append("body", state.body);
                params.append("img", state.imageLink);
                params.append("date", state.date);

                console.log(state);
                console.log(params);

                axios.post(url, params)
                    .then(function(response) {
                        console.log(response);
                        alert("Event created successfully.");
                    })
                    .catch(function(error) {
                        console.log(error);
                        alert("Error creating event.");
                        return state;
                    });
            }
            return Object.assign({}, state, {
                author: "",
                members: [],
                title: "",
                body: "",
                img: "",
                date: "",
                location: "",
                imageLink: "",
                errors: {},
            });

        case "RESET_ALL_STATE":
            return Object.assign({}, state, {
                author: "",
                members: [],
                title: "",
                body: "",
                img: "",
                date: "",
                location: "",
                imageLink: "",
                errors: {},
            });
        };

    return state;
};

export default createGaggleReducer;

