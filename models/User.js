const mongoose = require('mongoose');
const friends = require('mongoose-friends');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    username: {
        type: String,
        minlength: 4,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        required: true
    },
    is_active: { type: Boolean, default: false },
    githubID: String,
    slackID: String,
},
    { timestamps: true }
)



userSchema.plugin(friends({ pathName: "friends" }))
userSchema.plugin(uniqueValidator)
const User = mongoose.model('User', userSchema);

module.exports = User;
