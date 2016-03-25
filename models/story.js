'use strict';

var mongoose = require('mongoose');
var moment = require('moment');

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
  startsnippet: { type: String }, 
  snippets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Snippet" }]
});

storySchema.statics.add = function (story, cb) {
  var openingsnippet = {
    storytitle: story.title,
    content: story.startsnippet
  }
  Snippet.add(openingsnippet, (err, snippet) => {
    console.log("Snipet!, \n", snippet);
    console.log("Sniipet add");
    Story.create({
      title: story.title,
      isprivate: story.isprivate, 

    }, cb);
  })
};

Story = mongoose.model('Story', storySchema); 

module.exports = Story; 