'use strict';

const mongoose = require('mongoose');


const incomeSchema = new mongoose.Schema({
    srcOfIncome: {
        type: String,
        required: false,
    },
    amntOfIncome: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: false,
    }
});



const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;