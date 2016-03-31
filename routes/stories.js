'use strict';

var express = require('express');
var router = express.Router();
var Story = require('../models/story');

router.get('/', function(req, res, next) {
  console.log("getting stories");
  Story.find({}, function(err, stories){
    if(err) return res.status(400).send(err); 
    // console.log("Found them,", stories);
    // console.log("Found stories!");
    res.send(stories); 
  });
});

router.get('/:storyid', function(req, res, next) {
  // console.log("getting story with id,", req.params.storyid);
  Story.findById(req.params.storyid).populate('snippets')
  .exec(function(err, story){
    if(err) return res.status(400).send(err); 
    // console.log("Found it,", story);
    res.send(story); 
  });
});

router.post('/', function(req, res, next) {
  console.log("post story", req.body);
  Story.add(req.body, function(err, story){
    res.send(err || story);
  });
});

router.put('/:id', function(req, res, next) {
  console.log("post story", req.params.id);
  Story.findById(req.params.id, function(err, story){
    if(err) return res.status(400).send(err); 
    // console.log("Found one,", story);
    story.iscomplete = !story.iscomplete; 
    story.save(function(err, savedTodo){

      res.send(err || savedTodo);
    })
  });
});

router.delete('/:id', function(req, res, next) {
  // console.log("post story", req.params.id);
  Story.findById(req.params.id, function(err, story){
    if(err) return res.status(400).send(err); 
    console.log("Found one,", story);
    story.remove(function(err){
      res.status(err ? 400 : 200).send(err || story);
    })
  });
});

module.exports = router;
