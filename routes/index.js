'use strict';

var express = require('express');

var User = require('../models/user');
var Snippet = require('../models/snippet');

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

router.post('/snippets/:storyid', function(req, res, next){
  Snippet.add(req.body, function(err, snippet){    
    if (err) return res.status(400).send(err);
    res.status(200).send(snippet);
  });
})

module.exports = router;
