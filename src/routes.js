import React from "react";
import {Route, IndexRoute} from "react-router";

import LandingPage from "./components/containers/LandingPage/LandingPage";
import RegistrationPage from "./components/containers/Registration/RegistrationPage";
import MyAccountPage from "./components/containers/MyAccount/MyAccountPage";
import ChooseDestination from "./components/containers/ChooseDestination/ChooseDestination";
import MainPage from "./components/presentation/MainPage";
import App from "./components/presentation/App";
import Activity from "./components/containers/MainPage/Activities/Activity";

export default (
    <Route path="/" component={App}>
        <IndexRoute component={LandingPage} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/my-account" component={MyAccountPage} />
        <Route path="/choose-destination" component={ChooseDestination} />
        <Route path="/main-page" component={MainPage} />
        <Route path="/activity" component={Activity}/>
    </Route>
)