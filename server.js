'use strict';

const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const Income = require('./models/income');
const Expense = require('./models/expense');
const Savings = require('./models/savings');
const bodyParser = require('body-parser');
const config = require('./config');
const moment = require('moment');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const BasicStrategy = require('passport-http').BasicStrategy;
const app = express();
const auth = require('./routers/auth');

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));
app.use('/auth', auth);

mongoose.Promise = global.Promise;

// ---------------- RUN/CLOSE SERVER -----------------------
let server = undefined;

function runServer(urlToUse) {
    return new Promise((resolve, reject) => {
        mongoose.connect(urlToUse, err => {
            if (err) {
                return reject(err);
            }
            server = app.listen(config.PORT, () => {
                console.log(`Listening on localhost:${config.PORT}`);
                resolve();
            }).on('error', err => {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

if (require.main === module) {
    runServer(config.DATABASE_URL).catch(err => console.error(err));
}

function closeServer() {
    return mongoose.disconnect().then(() => new Promise((resolve, reject) => {
        console.log('Closing server');
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    }));
}


//------------------user endpoints---------------


//user sign-in
app.post('/users/login', (req, res) => {

    //username and password from ajax api call
    const username = req.body.username;
    const password = req.body.password;
    const activeUserID = req.body.activeUserID;

    //connect to the databas and validate username and password
    User.findOne({
        username: username
    }, (err, items) => {
        if (err) {
            return res.status(500).json({
                message: "Can't connect to the Database"
            });
        }
        //username not found
        if (!items) {
            return res.status(401).json({
                message: "Username not found"
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
                    return console.log(err);
                }
                else {
                    return res.json(items);
                }
            });
        };
    });
});


app.get('/check-duplicates/:username/:email', (req, res) => {

    //username and password from ajax api call
    const username = req.params.username;
    const email = req.params.email;
    //connect to the databas and validate username and password
    User.findOne({
        $or:[{username: username},{name: email}]
    }, (err, items) => {
        console.log(items);
        if (err) {
            return res.status(500).json({
                message: "Can't connect to the Database"
            });
        }
        //username not found
        if (!items) {
            return res.status(200).json({
                username: "", email: ""
            });
        }
        //username found
        else {
            return res.status(200).json({
                output: items
               
            });
        }
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


//PUT *******************************
//Income-----
app.put('/income/:id', function (req, res) {
    let toUpdate = {};
    let updateableFields = ['srcOfIncome', 'amntOfIncome', 'username',];
    updateableFields.forEach(function (field) {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });

    Income
        .findByIdAndUpdate(req.params.id, {
            $set: toUpdate
        }).exec().then(function () {
            return res.status(204).end();
        }).catch(function (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

//Expense - update with PUT
app.put('/expense/:id', function (req, res) {
    let toUpdate = {};
    let updateableFields = ['srcOfExpenses', 'amntOfExpenses', 'username',];
    updateableFields.forEach(function (field) {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });

    Expense
        .findByIdAndUpdate(req.params.id, {
            $set: toUpdate
        }).exec().then(function () {
            return res.status(204).end();
        }).catch(function (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});

//Savings - update with PUT
app.put('/savings/:id', function (req, res) {
    let toUpdate = {};
    let updateableFields = ['srcOfSavings', 'amntOfSavings', 'username',];
    updateableFields.forEach(function (field) {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
        }
    });

    Savings
        .findByIdAndUpdate(req.params.id, {
            $set: toUpdate
        }).exec().then(function () {
            return res.status(204).end();
        }).catch(function (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        });
});


//GET request to access data ***********************
//GET income
app.get('/income/:user', function (req, res) {

    Income
        .find({ 'username': req.params.user }) //find the user name
        .then(function (entries) {
            //console.log(entries);

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
        .find({ 'username': req.params.user })
        .then(function (entries) {
            //console.log(entries)

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
        .find({ 'username': req.params.user })
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


//Populate Chart****************
app.get('/populate-chart/:user', function (req, res) {
    let allSavingsExpensesIncome = [];

    Income
        .find({ 'username': req.params.user }) //find the user name
        .then(function (incomeEntries) {
            allSavingsExpensesIncome.push(incomeEntries);

            Expense
                .find({ 'username': req.params.user })
                .then(function (expenseEntries) {
                    allSavingsExpensesIncome.push(expenseEntries);

                    Savings
                        .find({ 'username': req.params.user })
                        .then(function (savingEntries) {
                            allSavingsExpensesIncome.push(savingEntries);
                            res.json({
                                allSavingsExpensesIncome
                            });
                        })

                        .catch(function (err) {
                            console.error(err);
                            res.status(500).json({
                                message: 'Internal server error'
                            });
                        });
                })
        })
});


// //GET by id
// app.get('/income/:id', function (req, res) {
//     Income
//         .findById(req.params.id).exec().then(function (income) {
//             return res.json(income);
//         })
//         .catch(function (entries) {
//             console.error(err);
//             res.status(500).json({
//                 message: 'Internal Server Error'
//             });
//         });
// });


// DELETE ----------------------------------------
// deleting an achievement by id
app.delete('/income/:id', function (req, res) {
    Income.findByIdAndRemove(req.params.id).exec().then(function (income) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});

//Expense--------
app.delete('/expense/:id', function (req, res) {
    Expense.findByIdAndRemove(req.params.id).exec().then(function (expense) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});

//Savings------
app.delete('/savings/:id', function (req, res) {
    Savings.findByIdAndRemove(req.params.id).exec().then(function (savings) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});


// MISC ------------------------------------------
// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', (req, res) => {
    res.status(404).json({
        message: 'Not Found'
    });
});


// //DB config
// const db = require('./config/keys').mongoURI

// //connect to mongo
// mongoose
//     .connect(db)
//     .then(() => console.log('Mongodb connected'))
//     .catch(err => console.log(err));

// const port = process.env.PORT || 3000

// app.listen(port, () => console.log(`App listening on port ${port}`));


exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;