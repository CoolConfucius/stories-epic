'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var jwt = require('jwt-simple');

var Snippet = require('../models/snippet');

var Story; 

var storySchema = mongoose.Schema({
  title: { type: String }, 
  startedby: { type: String }, 
  userid: { type: String }, 
  startdate: { type: Date, default: Date.now() },
  long: { type: String, default: moment().format('MM/DD/YYYY, h:mm a') }, 
  short: { type: String, default: moment().format('MM/DD/YYYY') }, 
  isprivate: { type: Boolean }, 
  views: { type: Number, default: 1 }, 
  opening: { type: String }, 
  snippets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Snippet" }]
});

storySchema.statics.add = function (story, cb) {
  // Story.create({
  //   title: story.title,
  //   isprivate: story.isprivate, 
  // }, cb);
  var userid, startedby; 
  if (story.user) {
    var token = story.user; 
    var payload = jwt.decode(token, process.env.JWT_SECRET); 
    userid = payload._id; 
    startedby = payload.username; 
  } else {
    userid = null; 
    startedby = null; 
  }

  var newstory = new Story({
    title: story.title,
    isprivate: story.isprivate, 
    opening: story.opening,
    userid: userid,
    startedby: startedby
  });
  newstory.save(function(err, savedStory) {
    if (err) return cb(err);
    cb(null, savedStory);
  });
};

Story = mongoose.model('Story', storySchema); 

module.exports = Story; 