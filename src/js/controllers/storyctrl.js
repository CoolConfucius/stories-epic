app.controller('storyCtrl', function($scope, $rootScope, $state, $stateParams, $localStorage, Story, Snippet ) {
  $rootScope.user = $localStorage.token; 

  $scope.newsnippet = {
    content: ""
  }
  
  var storyid = $state.params.storyid;

  $scope.editstoryobj = {}; 

  Story.read(storyid)
  .then(function(res) {
    $scope.story = res.data; 
    $scope.editstoryobj = {
      title: res.data.title, 
      isclosed: res.data.isclosed ? "Closed" : "Open", 
      opening: res.data.opening
    }
    if ($rootScope.user) {
      Story.checkfave($rootScope.user.config.data.username, storyid).then(function(res){
        $scope.isfave = res.data === 'true'; 
      })
    };
  });

  $scope.addsnippet = function(snippet, user){    
    var newObj; 
    var userdata = null;
    if (user) userdata = user.data;    
    newObj = {
      storytitle: $scope.story.title, 
      storyid: storyid,
      startdate: Date.now(),
      content: snippet.content, 
      user: userdata
    }    
    $scope.newsnippet = {
      content: ""
    }
    Snippet.add(newObj).then(function(savedSnippet){      
      var writtenby = user ? user.config.data.username : 'Anonymous'
      $scope.story.snippets.push({
        content: snippet.content, 
        writtenby: writtenby,
        _id: savedSnippet.data._id
      });
    }); 
  };

  $scope.iseditstory = false; 
  $scope.editstory = function(story, user){
    if (!user) return;
    if (story.startedby !== user.config.data.username) return;    
    $scope.iseditstory = !$scope.iseditstory; 
  }

  $scope.savechanges = function(editstoryobj){    
    Story.edit(storyid, editstoryobj).then(function(){
      $scope.story.title = editstoryobj.title;
      $scope.story.opening = editstoryobj.opening;
      $scope.story.isclosed = editstoryobj.isclosed === "Closed";
      $scope.iseditstory = false; 
    });
  };

  $scope.isdeleting = false; 
  $scope.deletestory = function(story, user) {    
    if (!user) return;
    if (story.startedby !== user.config.data.username) return;    
    $scope.isdeleting = !$scope.isdeleting; 
  }

  $scope.remove = function(){
    Story.remove(storyid).then(function(){
      $state.go('home');
    })
  }


  $scope.addfavorite = function(username, storyid, storystarter){
    if (username === storystarter) return swal("Try favorting other users stories instead of your own.");
    Story.favorite(username, storyid).then(function(){
      swal("Added to favorites!")
      $scope.isfave = true; 
    })
  }

  $scope.unfave = function(username, storyid){
    Story.unfave(username, storyid).then(function(){
      swal("Removed from favorites!")
      $scope.isfave = false; 
    })
  }

  
});
