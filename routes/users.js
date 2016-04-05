'use strict';

var express = require('express');

var User = require('../models/user');
var Snippet = require('../models/snippet');
var Story = require('../models/story');

var router = express.Router();

router.get('/:username', function(req, res, next) {
  // console.log("getting user with username,", req.params.username);
  User.findOne({ username: req.params.username.toString()})
  .populate('stories')
  .populate('snippets')
  .populate('favorites')
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

router.put('/addfave/:username/:storyid', function(req, res, next) {
  User.addfavorite(req.params.username, req.params.storyid, function(err, user){
    if(err) return res.status(400).send(err); 
    res.send(user); 
  })
});

module.exports = router;