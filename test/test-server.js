'use stict'

const {
    app,
    runServer,
    closeServer
} = require('../server');

const chai = require('chai');

const chaiHttp = require('chai-http');

const income = require('../models/income');

const expense = require('../models/expense');

const savings = require('../models/savings');

const should = chai.should();

chai.use(chaiHttp);


//Test Income****************************
describe('FIRE-node-app', function () {
    it('should add an income entry on POST', function () {
        chai.request(app)
            .post('/income/create')
            .send({
                srcOfIncome: 'Side Hustle',
                amntOfIncome: 10000,
                username: 'demo',
            })
            .then(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            })
            .catch(err => console.log({
                err
            }));
    });
    it('Should Update an income', function () {
        chai.request(app)
            .put('/income/:id') 
            .then(function (res) {
                res.should.have.status(201);
                done();
            })
            .catch(err => console.log({
                err
            }));
    });
    it('Should Delete an income', function () {

        chai.request(app)
            .delete('/income/:id')
            .then(function (res) {
                res.should.have.status(201);
                done();
            })
            .catch(err => console.log({
                err
            }));

    });
    it('Should Get All Users income entries', function () {

        chai.request(app)
            .get('/income/:user') 
            .then(function (res) {
                res.should.have.status(201);
                done();
            })
            .catch(err => console.log({
                err
            }));
    });
});


//Test Expense*****************
describe('FIRE-node-app', function () {
    it('should add an expense entry on POST', function () {
        chai.request(app)
            .post('/expense/create')
            .send({
                srcOfExpense: 'Credit Card',
                amntOfExpense: 100,
                username: 'demo',
            })
            .then(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            })
            .catch(err => console.log({
                err
            }));
    });
    it('Should Update an expense', function () {
        chai.request(app)
            .put('/expense/:id') 
            .then(function (res) {
                res.should.have.status(201);
                done();
            })
            .catch(err => console.log({
                err
            }));
    });
    it('Should Delete an expense', function () {

        chai.request(app)
            .delete('/expense/:id')
            .then(function (res) {
                res.should.have.status(201);
                done();
            })
            .catch(err => console.log({
                err
            }));

    });
    it('Should Get All Users expense entries', function () {

        chai.request(app)
            .get('/expense/:user') 
            .then(function (res) {
                res.should.have.status(201);
                done();
            })
            .catch(err => console.log({
                err
            }));
    });
});


//Test Savings*************************
describe('FIRE-node-app', function () {
    it('should add an savings entry on POST', function () {
        chai.request(app)
            .post('/savings/create')
            .send({
                srcOfExpense: 'Investment',
                amntOfExpense: 3000,
                username: 'demo',
            })
            .then(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                done();
            })
            .catch(err => console.log({
                err
            }));
    });
    it('Should Update an savings', function () {
        chai.request(app)
            .put('/savings/:id') 
            .then(function (res) {
                res.should.have.status(201);
                done();
            })
            .catch(err => console.log({
                err
            }));
    });
    it('Should Delete an savings', function () {

        chai.request(app)
            .delete('/savings/:id')
            .then(function (res) {
                res.should.have.status(201);
                done();
            })
            .catch(err => console.log({
                err
            }));

    });
    it('Should Get All Users savings entries', function () {

        chai.request(app)
            .get('/savings/:user') 
            .then(function (res) {
                res.should.have.status(201);
                done();
            })
            .catch(err => console.log({
                err
            }));
    });
});