'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var bcrypt = require('bcrypt-node');
var jwt = require('jwt-simple');

var Story = require('../models/story');
var Snippet = require('../models/snippet');
var authMiddleware = require('../config/auth');

var Schema = mongoose.Schema;
var User;

var userSchema = Schema({
  username:{ type: String, required: true, unique: true },
  password:{ type: String, required: true }, 
  joindate: { type: Date, default: Date.now() },
  long: { type: String, default: moment().format('MM/DD/YYYY, h:mm a') }, 
  short: { type: String, default: moment().format('MM/DD/YYYY') }, 
  imageurl: { type: String },
  aboutme: { type: String }, 
  age: { type: Number }, 
  birthday: { type: Date }, 
  gender: { type: String }, 
  location: { type: String }, 
  contact: { type: String }, 
  interests: { type: String }, 
  stories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Story" }],
  snippets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Snippet" }],
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Story" }]
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
    // console.log("do we have a problem here? \n", err, user);
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
          if (err) return cb(err, null);
          savedUser.password = null;
          // User.findOne({username: newUser.username}, function(err, dbUser) {
          //   if(err || !dbUser) return cb(err || 'Registration error');
              // dbUser.password = null;
              cb(null, dbUser);
          // });
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


userSchema.statics.edit = function(userObj, username, cb) {
  User.findOne({username: username}, function(err, user){
    if(err) return res.status(400).send(err); 
    user.imageurl = userObj.imageurl; 
    user.aboutme = userObj.aboutme; 
    user.age = userObj.age; 
    user.birthday = userObj.birthday; 
    user.gender = userObj.gender; 
    user.interests = userObj.interests; 
    user.contact = userObj.contact; 
    user.location = userObj.location; 
    user.save(function(err, savedUser){
      user.password = null; 
      if (err) return cb(err);
      cb(null, savedUser); 
    })
  });
}

userSchema.statics.checkfave = function(username, storyid, cb) {
  User.findOne({ username: username })
  .exec(function(err, user){
    if(err) return res.status(400).send(err); 
    if (user.favorites.indexOf(storyid) === -1) {
      cb(null, 'false');
    } else {
      cb(null, 'true');
    }
  });
}

userSchema.statics.addfavorite = function(username, storyid, cb) {
  User.findOne({ username: username })
  .exec(function(err, user){
    if(err) return res.status(400).send(err); 
    if (user.favorites.indexOf(storyid) === -1) {
      user.favorites.push(storyid);
    }
    user.save(function(err, savedUser){
      if (err) return cb(err);
      cb(null, savedUser); 
    })
  });
}

userSchema.statics.unfave = function(username, storyid, cb) {
  User.findOne({ username: username })
  .exec(function(err, user){
    if(err) return res.status(400).send(err); 
    var index = user.favorites.indexOf(storyid); 
    if (index !== -1) {
      user.favorites.splice(index, 1);
    }
    user.save(function(err, savedUser){
      if (err) return cb(err);
      cb(null, savedUser); 
    })
  });
}



User = mongoose.model('User', userSchema);
module.exports = User;
