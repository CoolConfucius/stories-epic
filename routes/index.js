'use strict';

var express = require('express');

var User = require('../models/user');
var Snippet = require('../models/snippet');
var Story = require('../models/story');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Collaborative Stories' });
});

router.post('/register', function(req, res, next){
  User.register(req.body, function(err, user){    
    if (user) {
      var token = user.token();
      res.status(200).send(token);
    } else {
      res.send(err);
    }
  });
})

router.post('/login', function(req, res, next){
  User.authenticate(req.body, function(err, user){
    if (err) return res.status(401).send(err);
    var token = user.token();
    res.status(200).send(token);
  });
})

router.post('/snippets', function(req, res, next){
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
    // res.send(snippet);

  });
})

router.get('/users/:username', function(req, res, next) {
  console.log("getting user with username,", req.params.username);
  User.findOne({ username: req.params.username}).populate('stories').populate('snippets')
  .exec(function(err, user){
    if(err) return res.status(400).send(err); 
    console.log("Found it,", user);
    // console.log("Found user!");
    res.send(user); 
  });
});

module.exports = router;
