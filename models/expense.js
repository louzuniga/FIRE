'use strict';

const mongoose = require('mongoose');


const expenseSchema = new mongoose.Schema({
    amntOfExpenses: {
        type: String,
        required: false,
    },
    srcOfExpenses: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: false,
    }
});



const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;