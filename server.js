'use strict';

const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Testing root directory');
});

//DB config
const db = require('./config/keys').mongoURI

//connect to mongo
mongoose
    .connect(db)
    .then(() => console.log('Mongodb connected'))
    .catch(err => console.log(err));


const port = process.env.PORT || 8080

app.listen(port, () => console.log(`App listening on port ${port}`));