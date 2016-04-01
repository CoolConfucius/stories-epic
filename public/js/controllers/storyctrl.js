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
      isprivate: res.data.isprivate ? "Private" : "Public", 
      opening: res.data.opening
    }
  });

  $scope.addsnippet = function(snippet, user){
    // console.log(snippet, "here's the snippet");
    var newObj; 
    var userdata = null;
    if (user) userdata = user.data;
    console.log("$scopestorytitle \n \n", $scope.story);
    newObj = {
      storytitle: $scope.story.title, 
      storyid: storyid,
      startdate: Date.now(),
      content: snippet.content, 
      user: userdata
    }
    console.log("new object, \n", newObj);
    $scope.newsnippet = {
      content: "default content"
    }
    Snippet.add(newObj).then(function(){
      // $state.go(`story`);
      $scope.story.snippets.push({content: snippet.content, writtenby: user.config.data.username });
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
      $scope.story.isprivate = editstoryobj.isprivate === "Private";
    });
  };

  
});
