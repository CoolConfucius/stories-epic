'use strict';

var express = require('express');
var router = express.Router();
var Story = require('../models/story');
// var authMiddleware = require('../config/auth');

router.get('/', function(req, res, next) {  
  Story.find({}, function(err, stories){
    if(err) return res.status(400).send(err);         
    res.send(stories); 
  });
});

router.get('/:storyid', function(req, res, next) {  
  Story.findById(req.params.storyid).populate('snippets')
  .exec(function(err, story){
    if(err) return res.status(400).send(err);     
    story.views++; 
    story.save(function(err, savedStory){
      res.send(story); 
    })
  });
});

router.post('/', function(req, res, next) {  
  Story.add(req.body, function(err, story){
    res.send(err || story);
  });
});

router.put('/:storyid', function(req, res, next) {
  // console.log(req.user, "\n req.user");
  Story.findById(req.params.storyid, function(err, story){
    if(err) return res.status(400).send(err); 
    story.title = req.body.title; 
    story.opening = req.body.opening; 
    story.isclosed = req.body.isclosed === "Closed"; 
    story.save(function(err, savedStory){
      res.send(err || savedStory);
    })
  });
});

router.delete('/:storyid', function(req, res, next) {  
  Story.findById(req.params.storyid, function(err, story){
    if(err) return res.status(400).send(err);     
    story.remove(function(err){
      res.status(err ? 400 : 200).send(err || story);
    })
  });
});

module.exports = router;
