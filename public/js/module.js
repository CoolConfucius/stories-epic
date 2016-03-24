'use strict'; 

var app = angular.module("app", ["ui.router", "ngStorage"]); 


app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', { url: '/', templateUrl: 'html/home.html', controller: 'mainCtrl' })
  .state('register', { url: '/register', templateUrl: 'html/register.html', controller: 'mainCtrl' })
  $urlRouterProvider.otherwise('/');
});


// Services: 
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

  this.toggle = function(story) {
    return $http.put(`/stories/${story}`)
  };

  this.remove = function(story) {
    return $http.delete(`/stories/${story}`)
  };
});

app.service('Auth', function($http, $state, $localStorage, $rootScope) {
  this.register = function(user) {    
    return $http({method: 'POST', url: '/register', data: user})
  };

  this.login = (user) => {
    return $http({method: 'POST', url: '/login', data: user});
  }
  
  this.logout = () => {
    this.token = null;
    $localStorage.token = null;
    $state.go('home');
  }

  this.user = function() {
    this.data = $localStorage.token; 
    $rootScope.user = $localStorage.token; 
  }
});

// Run: 
app.run(function(Auth, Story, $rootScope){
  Auth.user();
  Story.stories();
  $rootScope.stories = Story.data; 
});


// Controllers: 
app.controller('mainCtrl', function($rootScope, $localStorage, $scope, $state, Auth, Story){
  
  // User Related: 
  $rootScope.user = $localStorage.token;
  if ($rootScope.user) {
    $rootScope.username = $rootScope.user.config.data.username; 
  };
  // $rootScope.showlogin = false; 
  // $scope.toggleshowlogin = function(){
  //   $rootScope.showlogin = !$rootScope.showlogin;
  // }

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
      $localStorage.token = data; 
      $rootScope.user = data;
      $state.go('home');
    });
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

  $scope.sort = function(key){
    console.log("sort!");
    if ($scope.sorttext === key) {
      $scope.sorttext = '-'+key;   
    } else {
      $scope.sorttext = key; 
    }
  };

  $scope.addStory = function(story){
    var newObj; 
    if (story) {
      var description = story.description ? story.description : 'default description';
      newObj = {
        description: description, 
        date: Date.now(), 
        iscomplete: false, 
        due: story.due
      }
      
      $scope.stories.push(newObj); 
      $scope.story.description = " "; 
      
    } else {
      newObj = {
        description: "default description", 
        date: Date.now(), 
        iscomplete: false
      }
    }  
    Story.add(newObj); 
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
