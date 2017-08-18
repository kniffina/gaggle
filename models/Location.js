var mongoose = require('mongoose');
//blog.robertonodi.me/how-to-use-geospatial-indexing-in-mongodb-using-express-and-mongoose/

var LocationSchema = new mongoose.Schema({
    name: String,
    loc: {
        type: [Number], //[longitude, latitude]
        index: '2d'
    }
});

LocationSchema.methods.summary = function() {
    var summary = {
        id: this._id.toString(),
        name: this.name,
        loc: this.loc,
    };
    return summary;
};

module.exports = mongoose.model('LocationSchema', LocationSchema);