const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    firstName: { required: true, type: String },
    lastName: { required: true, type: String },
    email: { required: true, type: String },
    password: { required: true, type: String },
    isAdmin: { required: true, type: Boolean, default: false },
    avatarUrl: { required: false, type: String },
    address: { required: false, type: String },
    phone: { required: false, type: String },
    agree: { required: false, type: Boolean }
});
userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);

module.exports = User; 