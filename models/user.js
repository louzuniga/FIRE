'use stirct';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate(value) {
            if (value.includes('demo')) {
                throw new Error('Password cannot be demo')
            }
        }
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