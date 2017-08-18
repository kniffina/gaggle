var mongoose = require('mongoose');
var LocationController = require('../controllers/LocationController');
var promise = require('bluebird');
var Location = require('../models/Location.js');

var EventSchema = new mongoose.Schema({
    author: {
        type: String,
        default: ''
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    members: {
        type: Array,
        default: []
    },
    title: {
        type: String
    },
    body: {
        type: String,
        default: ''
    },
    comments: [{body: String, date: Date, author: String}],
    img: {
        type: String,
        default: ''
    },
    timestamp: {
        type: Date,
        default: new Date()
    },
    date: {
        type: Date,
        default: ''
    },
    location: {}
});

EventSchema.methods.summary = function() {
    var summary = {
        id: this._id.toString(),
        author: this.author,
        isPrivate: this.isPrivate,
        members: this.members,
        body: this.body,
        comments: this.comments,
        img: this.img,
        timestamp: this.timestamp,
        date: this.date,
        location: this.location
    };
    return summary;
};

module.exports = mongoose.model('EventSchema', EventSchema);