'use strict';

var mongoose = require('mongoose');
var moment = require('moment');
var Story; 

var storySchema = mongoose.Schema({
  title: { type: String }, 
  startdate: { type: Date, default: Date.now() },
  long: { type: String, default: moment().format('MM/DD/YYYY, h:mm a') }, 
  short: { type: String, default: moment().format('MM/DD/YYYY') }, 
  isprivate: { type: Boolean }, 
  snippets: []
});

storySchema.statics.add = function (story, cb) {
  Story.create({
    title: story.title,
    isprivate: story.isprivate
  }, cb);
};

Story = mongoose.model('Story', storySchema); 

module.exports = Story; 