'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var Snippet; 

var snippetSchema = mongoose.Schema({
  storytitle: { type: String }, 
  storyid: { type: String }, 
  startedby: { type: String }, 
  userid: { type: String }, 
  startdate: { type: Date, default: Date.now() },
  long: { type: String, default: moment().format('MM/DD/YYYY, h:mm a') }, 
  short: { type: String, default: moment().format('MM/DD/YYYY') }, 
  content: { type: String }
});

snippetSchema.statics.add = function (snippet, cb) {
  Snippet.create({
    storytitle: snippet.storytitle,
    isprivate: snippet.isprivate
  }, cb);
  var newSnippet = new Snippet({
    storytitle: snippet.storytitle,
    isprivate: snippet.isprivate
  })
};

Snippet = mongoose.model('Snippet', snippetSchema); 

module.exports = Snippet; 