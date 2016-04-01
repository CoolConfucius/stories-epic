'use strict';

var express = require('express');

var User = require('../models/user');
var Snippet = require('../models/snippet');
var Story = require('../models/story');

var router = express.Router();

router.post('/', function(req, res, next){
  Snippet.add(req.body, function(err, snippet){    
    if (err) return res.status(400).send(err);
    
    Story.findById(snippet.storyid, function(err, story){
      if (err || !story) return res.status(400).send(err); 
      console.log("Here's the story \n", story);
      story.snippets.push(snippet._id);
      story.save(function(err, savedStory){
        if (snippet.userid) {
          User.findById(snippet.userid, function(err, user){
            if (err || !user) return res.status(400).send(err); 
            user.snippets.push(snippet._id);
            user.save(function(err, savedUser){
              res.send(snippet);
            })
          })
        } else 
        res.send(snippet);
      })
    })

  });
})

router.get('/:snippetid', function(req, res, next) {
  // console.log("getting snippet with id,", req.params.storyid);
  Snippet.findById(req.params.snippetid, function(err, snippet){
    if(err) return res.status(400).send(err); 
    // console.log("Found it,", snippet);
    res.send(snippet); 
  });
});

router.put('/:snippetid', function(req, res, next) {
  Snippet.findById(req.params.snippetid, function(err, snippet){
    if(err) return res.status(400).send(err); 
    snippet.content = req.body.content;  
    snippet.save(function(err, savedSnippet){
      res.send(err || savedSnippet);
    })
  });
});

router.delete('/:snippetid', function(req, res, next) {
  Snippet.findById(req.params.snippetid, function(err, snippet){
    if(err) return res.status(400).send(err); 
    // console.log("Found one,", snippet);
    snippet.remove(function(err){
      res.status(err ? 400 : 200).send(err || snippet);
    })
  });
});


module.exports = router;