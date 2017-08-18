import React, { Component } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng, geocodeByPlaceId } from 'react-places-autocomplete';
import { handleDate, findLocation, setVariables, checkErrors } from "../../../../actions/newGaggleActions";
import {connect} from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

require("../../../../../public/stylesheets/style.css");

class NewGaggle extends Component {

    handleDate(date) {
        this.props.handleDate(date);
    }

    render() {
        const errors = this.props.errors;

        const cssClasses = {
            root: "form-group",
            input: "form-control",
        };
        const inputProps = {
            value: this.props.location,
            onChange: this.props.findLocation,
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

        return (
            <div>
                <div className="row">
                    <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                        <h1 className="text_align_center_class">Create a New Gaggle</h1>
                    </div>
                </div>
                { errors.totalErrors && <h4 className="help-block totalErrors">{errors.totalErrors}</h4> }
                <form>
                    <div className="row">
                        <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            { this.props.imageLink && <img src={this.props.imageLink} className="center_image"  height="150px" width="150px" /> }
                            <span><input onChange={this.props.setVariables} value={this.props.title} name="title" type="text" className="form-control has-success" placeholder="Title of Event"></input></span>
                            { errors.title && <span className="help-block errorField">{errors.title}</span> }
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <DatePicker
                                placeholderText="Select a date..."
                                selected={this.props.date}
                                onChange={this.handleDate.bind(this)}
                                className="form-control date_picker"
                            />
                            { errors.date && <span className="help-block errorField">{errors.date}</span> }
                        </div>
                    </div>


                    <div className="row">
                        <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <PlacesAutocomplete
                                inputProps={inputProps}
                                classNames={cssClasses}
                                highLightFirstSuggestion={true}
                                styles={myStyles}
                            />
                            { errors.location && <span className="help-block errorField">{errors.location}</span> }
                        </div>
                    </div>


                    <div className="row">
                        <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <span><input onChange={this.props.setVariables} value={this.props.imageLink} name="imageLink" type="text" className="form-control has-success" placeholder="Paste image URL here... (not required)"></input></span>
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                            <span><textarea onChange={this.props.setVariables} value={this.props.body} name="body" type="text" className="form-control has-success" placeholder="Enter your event description here..."></textarea></span>
                            { errors.body && <span className="help-block errorField">{errors.body}</span> }
                        </div>
                    </div>


                </form>
                <div className="row">
                    <div className="register_button_padding_bottom text_align_center_class col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1">
                        <button onClick={() => this.props.checkErrors(this.props)} type="submit" className="btn btn-default ">Create</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        author: state.createGaggle.author,
        members: state.createGaggle.members,
        title: state.createGaggle.title,
        body: state.createGaggle.body,
        img: state.createGaggle.img,
        date: state.createGaggle.date,
        location: state.createGaggle.location,
        imageLink: state.createGaggle.imageLink,
        errors: state.createGaggle.errors,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setVariables: (event) => dispatch(setVariables(event)),
        findLocation: (params) => dispatch(findLocation(params)),
        checkErrors: (params) => dispatch(checkErrors(params)),
        handleDate: (date) => dispatch(handleDate(date))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewGaggle);