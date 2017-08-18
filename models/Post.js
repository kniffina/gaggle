var mongoose = require('mongoose');
var LocationController = require('../controllers/LocationController');

var PostSchema = new mongoose.Schema({
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
    location: mongoose.Schema.ObjectId
});

PostSchema.methods.summary = function() {
    var summary = {
        id: this._id.toString(),
        author: this.author,
        isPrivate: this.isPrivate,
        members: this.members,
        body: this.body,
		comments: this.comments,
        img: this.img,
        timestamp: this.timestamp,
        location: this.location
    };
    return summary;
};


module.exports = mongoose.model('PostSchema', PostSchema);