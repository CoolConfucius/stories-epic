app.service('Story', function($http) {
  this.stories = function() {
    console.log("this.stories \n");
    return $http.get('/stories').then(res => {
      this.data = res.data; 
    }); 
  }; 

  this.getStories = function(cb) {
    console.log("this.getStories \n");
    return $http.get('/stories').then(res => {
      this.data = res.data; 
      cb();
    }); 
  }

  this.add = function(story) {
    return $http.post('/stories', story)
  };

  this.read = function(storyid){
    return $http.get(`/stories/${storyid}`)
  }

  this.toggle = function(story) {
    return $http.put(`/stories/${story}`)
  };

  this.remove = function(story) {
    return $http.delete(`/stories/${story}`)
  };
});