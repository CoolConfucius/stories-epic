app.controller('userstoriesCtrl', function($rootScope, $localStorage, $scope, $state, $stateParams, Auth, Story, Profile){
  $rootScope.user = $localStorage.token;

  var profilename = $state.params.profilename;
  Profile.read(profilename)
  .then(function(res) {
    // console.log("RES, Profile:", res);
    var data = res.data; 
    $scope.profile = data; 
    $scope.stories = data.stories; 
    
    var snippets = data.snippets; 
    var snippetstories = [];
    snippets.forEach(function(entry){
      if (snippetstories.indexOf(entry.storytitle) === -1) {
        snippetstories.push(entry.storytitle);
      }
    });
    // console.log(snippets, "SNIPPETS");
    // console.log(snippetstories, "SNIPPETSTORIES");
    $scope.contributions = snippetstories;
    
  });

  $scope.searchtext = ''; 


  // Story Related:
  $scope.getStories = Story.getStories(function(){
    $rootScope.stories = Story.data; 
    $scope.stories = $rootScope.stories;
  });

  $scope.sorttext = "-recent";
  $scope.sort = function(key){
    // console.log("sort! \n", key);
    $scope.sorttext = key; 
  };

  $scope.privatefilter = false; 
  $scope.filterisprivate = false; 
  $scope.filter = function(text){
    switch(text){
      case 'private':
        $scope.privatefilter = true; 
        $scope.filterisprivate = true;
        break;
      case 'public':
        $scope.privatefilter = true; 
        $scope.filterisprivate = false;
        break;
      default: 
        $scope.privatefilter = false; 
    }
  }

  $scope.newstory = {
    title: "Default title",
    isprivate: "Public",
    opening: "Default starting snippet."
  };

  $scope.story = {};

  $scope.openstory = function(story, user){
    // console.log(story, "here's the story");
    var newObj; 
    var userdata = null;
    if (user) userdata = user.data;
    
    newObj = {
      title: story.title, 
      startdate: Date.now(),
      isprivate: (story.isprivate === "Private"), 
      snippets: [], 
      opening: story.opening, 
      user: userdata
    }
    console.log("new object, \n", newObj);
    $scope.newstory = {
      title: "Default title",
      isprivate: "Public",
      opening: "Default opening snippet."
    }
    Story.add(newObj).then(function(){
      $state.go('home');
    }); 
  };

  $scope.toggle = function(story){
    var realIndex = $scope.stories.indexOf(story); 
    $scope.stories[realIndex].iscomplete = !$scope.stories[realIndex].iscomplete;
    Story.toggle(story._id.toString()); 
  }

  $scope.remove = function(story){
    var realIndex = $scope.stories.indexOf(story); 
    $scope.stories.splice(realIndex, 1);
    Story.remove(story._id.toString()); 
  }


})