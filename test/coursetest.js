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

describe('Course Create', () => {
    it('should create a new course', (done) => {
        let course = {
            name: 'Zero to Hero: Web Developer',
            instructor: userOne._id,
            language: 'English',
            category: 'Web Development'
        }
        chai
            .request(app)
            .post('/course/create')
            .set('Authorization', `Bearer ${usertokens[0].token}`)
            .send(course)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                done();
            });
    });
});

describe('Course View', () => {
    it('should display a particular course by id', (done) => {
        chai 
            .request(app)
            .get(`/course/view/${courseOne._id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                done();
        });
    });
});

describe('Course View All', () => {
    it('should display all the courses in the database', (done) => {
        chai 
            .request(app)
            .get(`/course/viewall`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                done();
        });
    });
});

describe('Course Update', () => {
    it('should update the course details', (done) => {
        let course = {
            name: 'Zero to Hero: Web Development'
        }
        chai
            .request(app)
            .put(`/course/update/${courseOne._id}`)
            .set('Authorization', `Bearer ${usertokens[0].token}`)
            .send(course)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                done();
            });
    });
});

describe('Course Delete', () => {
    it('should delete the course', (done) => {
        chai
            .request(app)
            .delete(`/course/delete/${courseOne._id}`)
            .set('Authorization', `Bearer ${usertokens[0].token}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('data');
                done();
            });
    });
});

describe('Upload Document', () => {
    it('should upload documents', (done) => {
      chai
        .request(app)
        .post('/course/upload/document')
        .set('Authorization', `Bearer ${usertokens[0].token}`)
        .attach('file', (''))
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message');
          done();
        });
    });
});

describe('Upload Video', () => {
    it('should upload videos', (done) => {
      chai
        .request(app)
        .post('/course/upload/video')
        .set('Authorization', `Bearer ${usertokens[0].token}`)
        .attach('video', (''))
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message');
          done();
        });
    });
});