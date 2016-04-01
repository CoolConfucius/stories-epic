// 'use strict';

// var app = angular.module("app"); 

app.service('Snippet', function($http) {
  this.add = function(snippet) {
    return $http.post(`/snippets`, snippet)
  };

  this.read = function(snippetid){
    return $http.get(`/snippets/${snippetid}`)
  };

});
