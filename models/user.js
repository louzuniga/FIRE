'use stirct';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: false,
    },
});

userSchema.methods.validatePassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, isValid) => {
        if (err) {
            callback(err);
            return;
        } callback(null, isValid);
    });
};

userSchema.pre('save', async function (next) {
    const username = this;
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;