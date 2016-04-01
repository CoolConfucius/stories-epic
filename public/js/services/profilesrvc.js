'use strict';

var app = angular.module("app"); 

app.service('Profile', function($http){
  this.read = function(username){
    return $http.get(`/users/${username}`)
  }

  this.edit = function(username, profile) {
    return $http.put(`/users/${username}`, profile)
  }
})