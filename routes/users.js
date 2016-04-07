'use strict';

var express = require('express');

var User = require('../models/user');
var Snippet = require('../models/snippet');
var Story = require('../models/story');

var router = express.Router();

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

router.get('/:username', function(req, res, next) {
  User.findOne({ username: req.params.username })
  .populate('stories snippets favorites')
  .select({'password':false})
  .exec(function(err, user){
    if(err) return res.status(400).send(err); 
    res.send(user); 
  });
});

router.put('/:username', function(req, res, next) {
  User.edit(req.body, req.params.username, function(err, user){
    if(err) return res.status(400).send(err); 
    res.send(user); 
  })
});

router.get('/checkfave/:username/:storyid', function(req, res, next) {
  User.checkfave(req.params.username, req.params.storyid, function(err, string){
    if(err) return res.status(400).send(err); 
    res.send(string); 
  })
});

router.put('/addfave/:username/:storyid', function(req, res, next) {
  User.addfavorite(req.params.username, req.params.storyid, function(err, user){
    if(err) return res.status(400).send(err); 
    res.send(user); 
  })
});

router.put('/unfave/:username/:storyid', function(req, res, next) {
  User.unfave(req.params.username, req.params.storyid, function(err, user){
    if(err) return res.status(400).send(err); 
    res.send(user); 
  })
});



module.exports = router;