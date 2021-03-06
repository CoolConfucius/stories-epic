app.service('Story', function($http) {
  this.stories = function() {    
    return $http.get('/stories').then(res => {
      this.data = res.data; 
    }); 
  }; 

  this.getStories = function(cb) {    
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

  this.checkfave = function(username, storyid) {
    return $http.get(`/users/checkfave/${username}/${storyid}`) 
  }
  
  this.favorite = function(username, storyid) {
    return $http.put(`/users/addfave/${username}/${storyid}`) 
  }

  this.unfave = function(username, storyid) {
    return $http.put(`/users/unfave/${username}/${storyid}`) 
  }


});