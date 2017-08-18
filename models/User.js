var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    username: {
        type: String, 
        default: ''
    },
     email: {
		type: String,
		default: ''
	},
    password: {
        type: String,
        default: ''
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    facebook: {
        id: {
            type: String,
            default: '',
        },
        token: {
            type: String,
            default: ''
        },
        firstName: {
            type: String,
            default: ''
        },
        lastName: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        },
		photo: {
			type: String,
			default: 'https://pbs.twimg.com/media/CfHNfbcW8AQK1eh.jpg'
		}
    }
})

UserSchema.methods.summary = function() {
    var summary = {
        id: this._id.toString(),
        username: this.username,
		email: this.email,
        joinDate: this.joinDate,
        facebook: {
            id: this.facebook.id,
            firstName: this.facebook.firstName,
            lastName: this.facebook.lastName,
            email: this.facebook.email,
			photo: this.facebook.photo
        }
    };
    return summary;
}

UserSchema.methods.comparePassword = function comparePassword(password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

module.exports = mongoose.model('UserSchema', UserSchema)