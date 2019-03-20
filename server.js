'use strict';

const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Income = require('./models/income');
const Expense = require('./models/expense');
const Savings = require('./models/savings');
const bodyParser = require('body-parser');
const moment = require('moment');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

mongoose.Promise = global.Promise;

//user sign-in
app.post('/users/login', (req, res) => {
    
    //username and password from ajax api call
    const username = req.body.username;
    const password = req.body.password;

    //connect to the databas and validate username and password
    User.findOne ({
        username: username 
    }, (err, items) => {
        if (err) {
            return res.status(500).json({
                message: "Can't connect to the Database"
            });
        }
        //username not found
        if (!items) {
            return res.status(401).json ({
                message: "Usename not found"
            });
        }
        //username found
        else {
            items.validatePassword(password, function (err, isValid) {
                if (err) {
                    return res.status(500).json({
                        message: "Cannot connect to DB to validate password"
                    });
                }
                if (!isValid) {
                    // return res.status(401).json({
                    //     message: "Password invalid"
                    //});
                    return console.log(err);
                }
                else {
                    return res.json(items);
                }
            });
        };
    });
});


//sign-up - creating a new user
app.post('/users/create', (req, res) => {

    //take the name, username and the password from the ajax api call
    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;

    //exclude extra spaces from the username and password
    username = username.trim();
    password = password.trim();

    //create an encryption key
    bcrypt.genSalt(10, (err, salt) => {

        //if creating the key returns an error...
        if (err) {
            //display it
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        //using the encryption key above generate an encrypted pasword
        bcrypt.hash(password, salt, (err, hash) => {

            //if creating the ncrypted pasword returns an error..
            if (err) {

                //display it
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            //using the mongoose DB schema, connect to the database and create the new user
            User.create({
                name,
                username,
                password: hash,
            }, (err, item) => {

                //if creating a new user in the DB returns an error..
                if (err) {
                    //display it
                    return res.status(500).json({
                        message: 'Internal Server Error'
                    });
                }
                //if creating a new user in the DB is succefull
                if (item) {

                    //display the new user
                    console.log(`User \`${username}\` created.`);
                    return res.json(item);
                }
            });
        });
    });
});

// Entry Endpoints********
//creating a new Entry with POST
app.post('/income/create', (req, res) => {
    let srcOfIncome = req.body.srcOfIncome;
    let amntOfIncome = req.body.amntOfIncome;
    let username = req.body.username;

    Income.create({
        srcOfIncome, amntOfIncome, username,
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            return res.json(item);
        }
    });
});

//expense
app.post('/expense/create', (req, res) => {
    let amntOfExpenses = req.body.amntOfExpenses;
    let srcOfExpenses = req.body.srcOfExpenses;
    let username = req.body.username;

    Expense.create({
        amntOfExpenses, srcOfExpenses, username,
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            return res.json(item);
        }
    });
});

//savings
app.post('/savings/create', (req, res) => {
    let amntOfSavings = req.body.amntOfSavings;
    let srcOfSavings = req.body.srcOfSavings;
    let username = req.body.username;

    Savings.create({
        amntOfSavings, srcOfSavings, username,
    }, (err, item) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        if (item) {
            return res.json(item);
        }
    });
});


//GET request to access data***********************
app.get('/income/:user', function (req, res) {

    Income
        .find({'username': req.params.user}) //find the user name
        .then(function (entries) {
            console.log(entries);
           
            res.json({
                entries
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

//GET expense
app.get('/expense/:user', function (req, res) {

    Expense
        .find({'username': req.params.user})
        .then(function (entries) {
           console.log(entries)

            res.json({
                entries
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});

//GET savings
app.get('/savings/:user', function (req, res) {

    Savings
        .find({'username': req.params.user})
        .then(function (entries) {
            res.json({
                entries
            });
        })
        .catch(function (err) {
            console.error(err);
            res.status(500).json({
                message: 'Internal server error'
            });
        });
});


//DB config
const db = require('./config/keys').mongoURI

//connect to mongo
mongoose
    .connect(db)
    .then(() => console.log('Mongodb connected'))
    .catch(err => console.log(err));

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`App listening on port ${port}`));