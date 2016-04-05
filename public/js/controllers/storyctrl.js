app.controller('storyCtrl', function($scope, $rootScope, $state, $stateParams, $localStorage, Story, Snippet ) {
  $rootScope.user = $localStorage.token; 

  $scope.newsnippet = {
    content: "default content"
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
        console.log("is fave???", res.data);
        $scope.isfave = res.data === 'true'; 
      })
    };
  });

  $scope.addsnippet = function(snippet, user){
    // console.log(snippet, "here's the snippet");
    var newObj; 
    var userdata = null;
    if (user) userdata = user.data;
    // console.log("$scopestorytitle \n \n", $scope.story.title);
    newObj = {
      storytitle: $scope.story.title, 
      storyid: storyid,
      startdate: Date.now(),
      content: snippet.content, 
      user: userdata
    }
    // console.log("new object, \n", newObj);
    $scope.newsnippet = {
      content: "default content"
    }
    Snippet.add(newObj).then(function(savedSnippet){
      // console.log("new obj", newObj);
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
    // console.log("Edit story! Passed error handling");
    $scope.iseditstory = !$scope.iseditstory; 
  }

  $scope.savechanges = function(editstoryobj){
    // console.log(editstoryobj);
    Story.edit(storyid, editstoryobj).then(function(){
      $scope.story.title = editstoryobj.title;
      $scope.story.opening = editstoryobj.opening;
      $scope.story.isclosed = editstoryobj.isclosed === "Closed";
      $scope.iseditstory = false; 
    });
  };

  $scope.isdeleting = false; 
  $scope.deletestory = function(story, user) {
    // console.log("deletestory!", story, user);
    if (!user) return;
    if (story.startedby !== user.config.data.username) return;
    // console.log("Delete story! Passed error handling");
    $scope.isdeleting = !$scope.isdeleting; 
  }

  $scope.remove = function(){
    Story.remove(storyid).then(function(){
      $state.go('home');
    })
  }


  $scope.addfavorite = function(username, storyid){
    console.log("storyid", storyid, username);
    Story.favorite(username, storyid).then(function(){
      swal("Added to favorites!")
      $scope.isfave = true; 
    })

  }

  
});
