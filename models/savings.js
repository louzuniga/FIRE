'use strict';

const mongoose = require('mongoose');

const savingsSchema = new mongoose.Schema({
    amntOfSavings: {
        type: String,
        required: false,
    },
    srcOfSavings: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: false,
    },
});


const Savings = mongoose.model('Savings', savingsSchema);

module.exports = Savings;