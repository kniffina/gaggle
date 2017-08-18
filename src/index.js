import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import thunkMiddleWare from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from "redux";
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import logger from "redux-logger";

import loginPageReducer from "./reducers/loginPageReducer";
import createGaggleReducer from "./reducers/createGaggleReducer";
import activityListReducer from "./reducers/activityListReducer";
import mapReducer from "./reducers/mapReducer";
import chooseDestinationReducer from "./reducers/chooseDestinationReducer";


import promise from 'redux-promise';



const store = createStore(
    combineReducers({
        login: loginPageReducer,
        createGaggle: createGaggleReducer,
        activityList: activityListReducer,
        mapReducer: mapReducer,
        chooseDestinationReducer: chooseDestinationReducer
    }),
    applyMiddleware(thunkMiddleWare, logger)
);


const app = (
    <Provider store={store}>
        <Router history={browserHistory} routes={routes} />
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));