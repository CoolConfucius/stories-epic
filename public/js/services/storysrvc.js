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

  this.edit = function(storyid, editstoryobj) {
    return $http.put(`/stories/${storyid}`, editstoryobj)
  };

  this.remove = function(storyid) {
    return $http.delete(`/stories/${storyid}`)
  };

  this.favorite = function(storyid, username) {
    
  }
});