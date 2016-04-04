app.controller('mainCtrl', function($rootScope, $localStorage, $scope, $state, $stateParams, Auth, Story){
  
  // User Related: 
  $rootScope.user = $localStorage.token;
  if ($rootScope.user) {
    $rootScope.username = $rootScope.user.config.data.username; 
  };

  $scope.searchtext = ''; 

  $scope.register = function(){
    console.log($scope.regpassword, $scope.regconfirmpassword, "\n Register! Scope password! \n");
    if ($scope.regpassword !== $scope.regconfirmpassword) {
      console.log($scope.regpassword, "\n Scope password! \n");
      swal("Passwords not the same!");
      return;
    };
    var user = {
      username: $scope.regusername,
      password: $scope.regpassword
    }
    Auth.register(user)
    .then((data)=>{
      console.log('data: ', data);
      if (data.data !== "Username already taken") {
        $localStorage.token = data; 
        $rootScope.user = data;
        $state.go('home');
      } else {
        swal("Username already taken!");  
      }
    }), 
    function err(err) {
      swal("Registration error");
    };
  }

  $scope.login = function() {
    var user = {
      password: $scope.logpassword,
      username: $scope.logusername
    }

    Auth.login(user)
    .then((data)=>{
      console.log('data: ', data);
      $localStorage.token = data; 
      $rootScope.user = data;
      $state.go('home');
    },
    function err(err) {
      swal("Invalid Password or Username");
    });
  }

  $scope.logout = function() {
    Auth.logout();
    $rootScope.user = null;
  }


  // Story Related:
  $scope.getStories = Story.getStories(function(){
    console.log("mainCtrl ctrl");
    $rootScope.stories = Story.data; 
    $scope.stories = $rootScope.stories;
  });

  $scope.sorttext = "-recent";
  $scope.sort = function(key){
    console.log("sort! \n", key);
    // if ($scope.sorttext === key) {
    //   $scope.sorttext = '-'+key;   
    // } else {
      $scope.sorttext = key; 
    // }
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