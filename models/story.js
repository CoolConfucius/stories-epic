'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var jwt = require('jwt-simple');

var User = require('../models/user');
var Snippet = require('../models/snippet');

var Schema = mongoose.Schema;
var Story; 

var storySchema = Schema({
  title: { type: String }, 
  startedby: { type: String }, 
  userid: { type: String }, 
  startdate: { type: Date, default: Date.now() },
  long: { type: String, default: moment().format('MM/DD/YYYY, h:mm a') }, 
  short: { type: String, default: moment().format('MM/DD/YYYY') }, 
  recent: { type: Date, default: Date.now() },
  recentlong: { type: String, default: moment().format('MM/DD/YYYY, h:mm a') }, 
  recentshort: { type: String, default: moment().format('MM/DD/YYYY') }, 
  recentby: { type: String }, 
  isclosed: { type: Boolean }, 
  views: { type: Number, default: 1 }, 
  opening: { type: String }, 
  snippets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Snippet" }]
});

storySchema.statics.add = function (story, cb) {
  var userid, startedby; 
  if (story.user) {
    var token = story.user; 
    var payload = jwt.decode(token, process.env.JWT_SECRET); 
    userid = payload._id; 
    startedby = payload.username; 
  } else {
    userid = null; 
    startedby = "Anonymous"; 
  }

  var newstory = new Story({
    title: story.title,
    isclosed: story.isclosed, 
    opening: story.opening,
    userid: userid,
    startedby: startedby,
    recentby: startedby
  });
  newstory.save(function(err, savedStory) {
    if (err) return cb(err);
    if (savedStory.userid) {
      User.findById(savedStory.userid, function(err, user){
        if (err || !user) return cb('user not found', null);
        user.stories.push(savedStory._id);
        user.save(function(err, savedUser){
          cb(null, savedStory);  
        })
      })
    } else cb(null, savedStory);
  });
};

Story = mongoose.model('Story', storySchema); 
module.exports = Story; 