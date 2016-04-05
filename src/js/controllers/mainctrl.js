app.controller('mainCtrl', function($rootScope, $localStorage, $scope, $state, $stateParams, Auth, Story){
  
  // User Related: 
  $rootScope.user = $localStorage.token;
  if ($rootScope.user) {
    $rootScope.username = $rootScope.user.config.data.username; 
  };

  $scope.searchtext = ''; 

  $scope.register = function(){
    if ($scope.regpassword !== $scope.regconfirmpassword) {
      swal("Passwords not the same!");
      return;
    };
    var user = {
      username: $scope.regusername,
      password: $scope.regpassword
    }
    Auth.register(user)
    .then((data)=>{
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
    $rootScope.stories = Story.data; 
    $scope.stories = $rootScope.stories;
  });

  $scope.sorttext = "-recent";
  $scope.sort = function(key){
    $scope.sorttext = key; 
  };

  $scope.closedfilter = false; 
  $scope.filterisclosed = false; 
  $scope.filter = function(text){
    switch(text){
      case 'closed':
        $scope.closedfilter = true; 
        $scope.filterisclosed = true;
        break;
      case 'open':
        $scope.closedfilter = true; 
        $scope.filterisclosed = false;
        break;
      default: 
        $scope.closedfilter = false; 
    }
  }

  $scope.newstory = {
    title: "",
    isclosed: "Open",
    opening: ""
  };

  $scope.story = {};

  $scope.openstory = function(story, user){
    if (story.title.length === 0) return swal("Enter a story title!");
    if (story.opening.length === 0) return swal("Enter a story opening!");

    var newObj; 
    var userdata = null;
    if (user) userdata = user.data;
    
    newObj = {
      title: story.title, 
      startdate: Date.now(),
      isclosed: (story.isclosed === "Closed"), 
      snippets: [], 
      opening: story.opening, 
      user: userdata
    }
    
    $scope.newstory = {
      title: "",
      isclosed: "Open",
      opening: ""
    }
    Story.add(newObj).then(function(){
      $state.go('home');
    }); 
  };

})