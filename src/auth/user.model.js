const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    firstName: { required: true, type: String },
    lastName: { required: true, type: String },
    email: { required: true, type: String },
    password: { required: true, type: String },
    isAdmin: { required: true, type: Boolean, default: false }
});
userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);

module.exports = User;