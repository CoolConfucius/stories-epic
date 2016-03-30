'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var Snippet; 

var snippetSchema = mongoose.Schema({
  storytitle: { type: String }, 
  storyid: { type: String }, 
  writtenby: { type: String }, 
  userid: { type: String }, 
  startdate: { type: Date, default: Date.now() },
  long: { type: String, default: moment().format('MM/DD/YYYY, h:mm a') }, 
  short: { type: String, default: moment().format('MM/DD/YYYY') }, 
  content: { type: String }
});

snippetSchema.statics.add = function (snippet, cb) {
  var userid, writtenby; 
  if (snippet.user) {
    var token = snippet.user; 
    var payload = jwt.decode(token, process.env.JWT_SECRET); 
    userid = payload._id; 
    writtenby = payload.username; 
  } else {
    userid = null; 
    writtenby = "Troll"; 
  }

  var newsnippet = new Snippet({
    title: story.title,
    isprivate: story.isprivate, 
    opening: story.opening,
    userid: userid,
    startedby: startedby
  });
  newsnippet.save(function(err, savedStory) {
    if (err) return cb(err);
    cb(null, savedStory);
  });
};

Snippet = mongoose.model('Snippet', snippetSchema); 

module.exports = Snippet; 