import React, {Component} from "react";
import { browserHistory} from "react-router"
import {connect} from "react-redux";
import Navbar from "../Navbar/Navbar";
import DatePicker from "react-datepicker";
var vars = require('../../../utils/vars.js');
import "react-datepicker/dist/react-datepicker.css";
import PlacesAutocomplete, { geocodeByAddress, getLatLng, geocodeByPlaceId } from 'react-places-autocomplete';
import { resetBrowser, setLocation, handleDate, getActivities, sendToNewGaggle, checkDestinationErrors, onChange } from "../../../actions/chooseDestinationActions";
require("../../../../public/stylesheets/style.css");

class ChooseDestination extends Component {
    componentWillUpdate(nextProps) {
        if(nextProps.sendToMain === true && nextProps.pushBrowser === false) {
            this.props.getActivities(nextProps.location);
        }

        if(nextProps.pushBrowser === true) {
            this.props.resetBrowser();

        }
    }

    handleDate(date) {
        this.props.handleDate(date);
    }

    render() {
        const cssClasses = {
            root: "form-group",
            input: "form-control",
        };
        const inputProps = {
            value: this.props.location,
            onChange: this.props.setLocation,
            placeholder: "Choose a destination...",
            className: "form-control",
        };

        const myStyles = {
            root: { position: 'absolute' },
            input: { width: '100%' },
            autocompleteContainer: {
                zIndex: 9999,
                backgroundColor: 'red' },
            autocompleteItem: { color: 'black' },
            autocompleteItemActive: { color: 'red' }
        };

        const errors = this.props.errors;
        return (
            <div>
                <div className="container">
                    <Navbar />
                    <br />
                    <br />
                    <form>
                        <div className="row">
                            <div id="destination_form_group_date" className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                                <h1 className="text_align_center_class">Where are you headed?</h1>
                                { errors.totalErrors && <h4 className="help-block landingTotalErrors">{errors.totalErrors}</h4> }

                                <br />
                                <DatePicker
                                    placeholderText="Select a date..."
                                    selected={this.props.date}
                                    onChange={this.handleDate.bind(this)}
                                    className="form-control date_picker"

                                />
                                { errors.date && <h4 className="help-block landingTotalErrors">{errors.date}</h4> }
                            </div>
                        </div>


                        <div className="row">
                            <div id="destination_form_group_location" className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                                <PlacesAutocomplete
                                    inputProps={inputProps}
                                    classNames={cssClasses}
                                    highLightFirstSuggestion={true}
                                    styles={myStyles}
                                />
                                { errors.location && <h4 className="help-block landingTotalErrors">{errors.location}</h4> }

                            </div>
                        </div>
                    </form>
                    <div className="row">
                        <div className="text_align_center_class col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <button onClick={this.props.checkDestinationErrors} className="btn btn-default btn-lg">Submit</button>
                            <button onClick={this.props.sendToNewGaggle} className="btn btn-default btn-lg new_gaggle_button">New Gaggle</button>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}


const mapStateToProps = (state) => {
    return {
        activities: state.activities,
        date: state.chooseDestinationReducer.date,
        location: state.chooseDestinationReducer.location,
        errors: state.chooseDestinationReducer.errors,
        centerOfMap: state.centerOfMap,
        sendToMain: state.chooseDestinationReducer.sendToMain,
        pushBrowser: state.chooseDestinationReducer.pushBrowser,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        checkDestinationErrors: (params) => dispatch(checkDestinationErrors(params)),
        setLocation: (params) => dispatch(setLocation(params)),
        handleDate: (date) => dispatch(handleDate(date)),
        onChange: (event) => dispatch(onChange(event)),
        sendToNewGaggle: () => dispatch(sendToNewGaggle()),
        getActivities: (location) => dispatch(getActivities(location)),
        resetBrowser: () => dispatch(resetBrowser())

    }
};



export default connect(mapStateToProps, mapDispatchToProps)(ChooseDestination);