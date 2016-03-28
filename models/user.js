'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-node');
var jwt = require('jwt-simple');

var Story = require('../models/story');
var Snippet = require('../models/snippet');

var Schema = mongoose.Schema;
var User;

var userSchema = Schema({
  username:{ type: String, required: true, unique: true },
  password:{ type: String, required: true }, 
  aboutme: { type: String }, 
  age: { type: Number }, 
  birthday: { type: Date }, 
  gender: { type: String }, 
  location: { type: String }, 
  contactinfo: { type: String }, 
  interests: { type: String }, 
  stories: [{ type: mongoose.Schema.Types.ObjectId, ref: "story" }],
  snippets: [{ type: mongoose.Schema.Types.ObjectId, ref: "snippet" }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "story" }]
});

userSchema.methods.token = function() {
  var payload = {
    username: this.username,
    _id: this._id
  };
  var secret = process.env.JWT_SECRET;
  var token = jwt.encode(payload, secret);
  return token;
};

userSchema.statics.register = function(user, cb) {
  var username = user.username;
  var password = user.password;
  User.findOne({username: username}, function(err, user){
    console.log("do we have a problem here? \n", err, user);
    // if(err || user) return cb(err || 'Username already taken.');
    if(user) return cb("Username already taken", null);
    // if(err || user) return cb(err, null);
    if(err || user) {
      console.log("here? HERE? \n");
    };
    bcrypt.genSalt(10, function(err1, salt) {
      bcrypt.hash(password, salt, null, function(err2, hash) {
        if(err1 || err2) return cb(err1 || err2);
        var newUser = new User();
        newUser.username = username;
        newUser.password = hash;
        newUser.save(function(err, savedUser){
          savedUser.password = null;
          User.findOne({username: newUser.username}, function(err, dbUser) {
            if(err || !dbUser) return cb(err || 'Registration error');
              dbUser.password = null;
              cb(null, dbUser);
          });
        });
      });
    });
  });
};

userSchema.statics.authenticate = function(inputUser, cb){
  User.findOne({username: inputUser.username}, function(err, dbUser) {
    if(err || !dbUser) return cb(err || 'Incorrect username or password.');
    bcrypt.compare(inputUser.password, dbUser.password, function(err, isGood){
      if(err || !isGood) return cb(err || 'Incorrect username or password.');
      dbUser.password = null;
      cb(null, dbUser);
    });
  });
};

User = mongoose.model('User', userSchema);
module.exports = User;
