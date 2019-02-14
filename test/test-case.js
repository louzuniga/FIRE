'use stict'

const test = require('./test');
const expect = require('chai');
const chaiHttp = require('chai-http');

// it('should add two numbers', () => {
//     let res = test.add(33,11);

//     if(res !== 44) {
//         throw new Error(`Expected 44, but got ${res}`)
//     }
// }); 

const {app, runServer, closeServer} = require('../server');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Users', function () {
    before(function() {
        
    });
});