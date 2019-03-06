'use strict';

const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

app.use(express.static('public'));

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
                message: "Can't connect to eh Datebase"
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
            items.validatePassword(password, (err, isValiid) => {
                if (err) {
                    return res.status(500).json({
                        message: "Cannot connect to DB to validate password"
                    });
                }
                if (!isVaslid) {
                    return res.status(401).json({
                        message: "Password invalid"
                    });
                }
                else {
                    return res.json(items);
                }
            });
        };
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