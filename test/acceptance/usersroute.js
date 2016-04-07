'use strict';

var supertest = require('supertest'); 
var mongoose = require('mongoose'); 
var expect = require('chai').expect;

var app = require('../../app');
var User = require('../../models/user'); 


const dbUrl = 'mongodb://localhost/storiesepic-test';

before(function(done) {
  mongoose.connection.close(function() {
    mongoose.connect(dbUrl, function(err) {
      done(err);
    });
  });
});


after(function(done) {
  mongoose.connection.close(function() {
    done();
  });
});

beforeEach(function(done) {
  User.remove({}, function(err){
    if (err) return done(err);
    var testUser = { username: 'user1', password: 'very secure' };
    User.register(testUser, function(err, user) {
      done(err); 
    }); 
  });
})

describe('users route', function() {
  describe('GET /users/:username', function() {

    it('should return user of username.', function(done) {

      supertest(app)
        .get('/users/:user1')
        .end(function(err, res) {

          expect(res.statusCode).to.equal(200); 
          done(); 
        })
    });

  });


  describe('POST /users/login', function() {

    var agent = supertest.agent(app);

    it('should login a user, and set a cookie with a token.', function(done) {
      agent
        .post('/users/login')
        .send({'username':'user1', password: 'very secure'})
        .expect(200)
        // .expect('set-cookie', /cookie\=.+/)
        .end(done);

    });

  });
});


