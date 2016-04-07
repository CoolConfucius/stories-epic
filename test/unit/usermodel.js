'use strict';

var path = require('path'); 
var chai = require('chai'); 
var mongoose = require('mongoose'); 
var expect = chai.expect; 

var User = require(path.join(__dirname, '../../models/user')); 

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

describe('User', function() {
  
  describe('.register()', function() {

    it('should register a new user, with a valid username and password.', function(done) {
    
      var testUser = {username: 'mrdude', password: 'very secure'};
    
      User.register(testUser, function(err, user){
        expect(err).to.be.null;
        expect(user.username).to.equal(testUser.username); 
        expect(user.password).to.be.null; 
        done(); 
      })
    });

    it('should NOT register a user - username already taken.', function(done) {
    
      var testUser = {username: 'user1', password: 'very secure'};
    
      User.register(testUser, function(err, user){
        expect(err).to.exist; 
        expect(user).to.not.exist; 
        done(); 
      })
      
    });
  });
});


