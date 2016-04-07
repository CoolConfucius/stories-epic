'use strict';

var jwt = require('jwt-simple');
var JWT_SECRET = process.env.JWT_SECRET;

var User = require('../models/user');

var authMiddleware = function(req, res, next) {
  try {
    var payload = jwt.decode(req.cookies, JWT_SECRET);
    console.log('Payload:', payload);
  } catch(err) {
    console.log("err:",err);
  }
  // req.user = payload;
  // User find by Id
  User.findbyId(payload._id, function(err, user){
    req.user = user; 
    next();
  }); 
  // next();
};

module.exports = authMiddleware;
