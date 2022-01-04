// Importing modules
const chai = require('chai');
const chaihttp = require('chai-http');
const { userOne, courseOne, databaseReq } = require('./fixtures/database.js');
const app = require('../app.js');

// Requiring should style of chai js
const should = require('chai').should();

chai.use(chaihttp);

beforeEach(databaseReq);

let usertokens = userOne.tokens;

describe('Create User', () => {
    it('should create a new user', (done) => {
        let user = {
            name: 'Valteri Bottas',
            username: 'batata',
            email: 'batata@gmail.com',
            password: 'iamnotspeed',
            userType: 'INSTRUCTOR'
        };
        chai
            .request(app)
            .post('/user/create')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                done();
            });
    });
});

describe('User Login', () => {
    it('should log the user in', (done) => {
        chai
            .request(app)
            .post('/user/login')
            .send({
                email: userOne.email,
                password: userOne.password,
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

describe('User Logout', () => {
    it('should log the user out', (done) => {
        chai
            .request(app)
            .post('/user/logout')
            .set('Authorization', `Bearer ${usertokens[0].token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });
});

describe('User Logout All', () => {
    it('should log the user out of all the devices', (done) => {
        chai
            .request(app)
            .post('/user/logoutAll')
            .set('Authorization', `Bearer ${usertokens[0].token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            });
    });
});

describe('User Update', () => {
    it('should update user details', (done) => {
        chai
            .request(app)
            .put('/user/update/me')
            .set('Authorization', `Bearer ${usertokens[0].token}`)
            .send({
                name: "Johnnie Doe"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                done();
            });
    });
});

describe('User Delete', () => {
    it('should delete current user', (done) => {
        chai
            .request(app)
            .delete('/user/delete/me')
            .set('Authorization', `Bearer ${usertokens[0].token}`)
            .end((err,res) => {
                res.should.have.status(200);
                res.body.should.have.property('message')
                done();
            });
    });
});