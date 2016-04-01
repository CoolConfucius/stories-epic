app.service('Snippet', function($http) {
  this.add = function(snippet) {
    return $http.post(`/snippets`, snippet)
  };

  this.read = function(snippetid){
    return $http.get(`/snippets/${snippetid}`)
  };

  this.edit = function(snippetid, editcontent){
    return $http.put(`/snippets/${snippetid}`, {content: editcontent})
  }

});
