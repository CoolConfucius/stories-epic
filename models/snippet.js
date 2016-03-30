'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var jwt = require('jwt-simple');

var Story = require('../models/story');

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

snippetSchema.statics.add = function (snippet,  cb) {
  console.log("DOES IT BREAK HERE?");
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
    storytitle: snippet.title,
    storyid: snippet.storyid,
    content: snippet.content,
    userid: userid,
    writtenby: writtenby
  });
  newsnippet.save(function(err, savedSnippet) {
    if (err) return cb(err);
    console.log("\n Savedsniipet story",savedSnippet.storyid);
    Story.findById(savedSnippet.storyid).exec(function(err, story){
      if (err || !story) return cb('story not found', null);
      console.log("Here's the story \n", story);
      story.snippets.push(savedSnippet._id);
      story.save(function(err, savedStory){
        if (savedSnippet.userid) {
          User.findById(savedSnippet.userid, function(err, user){
            if (err || !user) return cb('user not found', null);
            user.snippets.push(savedSnippet._id);
            user.save(function(err, savedUser){
              cb(null, savedSnippet);  
            })
          })
        } else cb(null, savedSnippet);      
      })
    });
  });
};

Snippet = mongoose.model('Snippet', snippetSchema); 

module.exports = Snippet; 