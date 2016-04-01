'use strict'; 

var app = angular.module("app", ["ui.router", "ngStorage"]); 


app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', { url: '/', templateUrl: 'html/home.html', controller: 'mainCtrl' })
  .state('register', { url: '/register', templateUrl: 'html/register.html', controller: 'mainCtrl' })
  .state('createstory', { url: '/createstory', templateUrl: 'html/createstory.html', controller: 'mainCtrl' })
  .state('story', { url: '/story/:storyid', templateUrl: 'html/story.html', controller: 'storyCtrl' })
  .state('profile', { url: '/profile/:profilename', templateUrl: 'html/profile.html', controller: 'profileCtrl' })
  $urlRouterProvider.otherwise('/');
});


// Services: 
// Story Service: 
// app.service('Story', function($http) {
//   this.stories = function() {
//     console.log("this.stories \n");
//     return $http.get('/stories').then(res => {
//       this.data = res.data; 
//     }); 
//   }; 

//   this.getStories = function(cb) {
//     console.log("this.getStories \n");
//     return $http.get('/stories').then(res => {
//       this.data = res.data; 
//       cb();
//     }); 
//   }

//   this.add = function(story) {
//     return $http.post('/stories', story)
//   };

//   this.read = function(storyid){
//     return $http.get(`/stories/${storyid}`)
//   }

//   this.toggle = function(story) {
//     return $http.put(`/stories/${story}`)
//   };

//   this.remove = function(story) {
//     return $http.delete(`/stories/${story}`)
//   };
// });

// Snippet Service
// app.service('Snippet', function($http) {
//   this.add = function(snippet) {
//     return $http.post(`/snippets`, snippet)
//   };
// });

// Profile Service 
// app.service('Profile', function($http){
//   this.read = function(username){
//     return $http.get(`/users/${username}`)
//   }

//   this.edit = function(username, profile) {
//     return $http.put(`/users/${username}`, profile)
//   }
// })

// Auth Service: 
// app.service('Auth', function($http, $state, $localStorage, $rootScope) {
//   this.register = function(user) {    
//     return $http({method: 'POST', url: '/register', data: user})
//   };

//   this.login = (user) => {
//     return $http({method: 'POST', url: '/login', data: user});
//   }
  
//   this.logout = () => {
//     this.token = null;
//     $localStorage.token = null;
//     $state.go('home');
//   }

//   this.user = function() {
//     this.data = $localStorage.token; 
//     $rootScope.user = $localStorage.token; 
//   }

//   // this.read = function(username){
//   //   return $http.get(`/users/${username}`)
//   // }

// });

// Controllers: 
// mainCtrl
// app.controller('mainCtrl', function($rootScope, $localStorage, $scope, $state, $stateParams, Auth, Story){
  
//   // User Related: 
//   $rootScope.user = $localStorage.token;
//   if ($rootScope.user) {
//     $rootScope.username = $rootScope.user.config.data.username; 
//   };

//   $scope.register = function(){
//     console.log($scope.regpassword, $scope.regconfirmpassword, "\n Register! Scope password! \n");
//     if ($scope.regpassword !== $scope.regconfirmpassword) {
//       console.log($scope.regpassword, "\n Scope password! \n");
//       swal("Passwords not the same!");
//       return;
//     };
//     var user = {
//       username: $scope.regusername,
//       password: $scope.regpassword
//     }
//     Auth.register(user)
//     .then((data)=>{
//       console.log('data: ', data);
//       if (data.data !== "Username already taken") {
//         $localStorage.token = data; 
//         $rootScope.user = data;
//         $state.go('home');
//       } else {
//         swal("Username already taken!");  
//       }
//     }), 
//     function err(err) {
//       swal("Registration error");
//     };
//   }

//   $scope.login = function() {
//     var user = {
//       password: $scope.logpassword,
//       username: $scope.logusername
//     }

//     Auth.login(user)
//     .then((data)=>{
//       console.log('data: ', data);
//       $localStorage.token = data; 
//       $rootScope.user = data;
//       $state.go('home');
//     },
//     function err(err) {
//       swal("Invalid Password or Username");
//     });
//   }

//   $scope.logout = function() {
//     Auth.logout();
//     $rootScope.user = null;
//   }


//   // Story Related:
//   $scope.getStories = Story.getStories(function(){
//     console.log("mainCtrl ctrl");
//     $rootScope.stories = Story.data; 
//     $scope.stories = $rootScope.stories;
//   });

//   $scope.sorttext = "-recent";
//   $scope.sort = function(key){
//     console.log("sort!");
//     if ($scope.sorttext === key) {
//       $scope.sorttext = '-'+key;   
//     } else {
//       $scope.sorttext = key; 
//     }
//   };

//   $scope.newstory = {
//     title: "Default title",
//     isprivate: "Public",
//     opening: "Default starting snippet."
//   };

//   $scope.story = {};

//   $scope.openstory = function(story, user){
//     // console.log(story, "here's the story");
//     var newObj; 
//     var userdata = null;
//     if (user) userdata = user.data;
    
//     newObj = {
//       title: story.title, 
//       startdate: Date.now(),
//       isprivate: (story.isprivate === "Private"), 
//       snippets: [], 
//       opening: story.opening, 
//       user: userdata
//     }
//     console.log("new object, \n", newObj);
//     $scope.newstory = {
//       title: "Default title",
//       isprivate: "Public",
//       opening: "Default opening snippet."
//     }
//     Story.add(newObj).then(function(){
//       $state.go('home');
//     }); 
//   };

//   $scope.toggle = function(story){
//     var realIndex = $scope.stories.indexOf(story); 
//     $scope.stories[realIndex].iscomplete = !$scope.stories[realIndex].iscomplete;
//     Story.toggle(story._id.toString()); 
//   }

//   $scope.remove = function(story){
//     var realIndex = $scope.stories.indexOf(story); 
//     $scope.stories.splice(realIndex, 1);
//     Story.remove(story._id.toString()); 
//   }


// })

// storyCtrl
// app.controller('storyCtrl', function($scope, $rootScope, $state, $stateParams, $localStorage, Story, Snippet ) {
//   $rootScope.user = $localStorage.token; 

//   $scope.newsnippet = {
//     content: "default content"
//   }
  
//   var storyid = $state.params.storyid;

//   Story.read(storyid)
//   .then(function(res) {
//     $scope.story = res.data; 
//   });

//   $scope.addsnippet = function(snippet, user){
//     // console.log(snippet, "here's the snippet");
//     var newObj; 
//     var userdata = null;
//     if (user) userdata = user.data;
//     console.log("$scopestorytitle \n \n", $scope.story);
//     newObj = {
//       storytitle: $scope.story.title, 
//       storyid: storyid,
//       startdate: Date.now(),
//       content: snippet.content, 
//       user: userdata
//     }
//     console.log("new object, \n", newObj);
//     $scope.newsnippet = {
//       content: "default content"
//     }
//     Snippet.add(newObj).then(function(){
//       // $state.go(`story`);
//       $scope.story.snippets.push({content: snippet.content, writtenby: user.config.data.username });
//     }); 
//   };

//   $scope.iseditstory = false; 
//   $scope.editstory = function(story, user){
//     if (!user) return;
//     if (story.startedby !== user.config.data.username) return;
//     console.log("Edit story! Passed error handling");
//     $scope.iseditstory = !$scope.iseditstory; 
//   }

//   $scope.isediting = false; 
//   $scope.editsnippet = function(snippet, user) {
//     console.log("edit snippet!", snippet, user);
//     if (!user) return;
//     if (snippet.writtenby !== user.config.data.username) return;
//     console.log("Edit snippet! Passed error handling");
//     $scope.isediting = !$scope.isediting; 
//   }
// });


// profileCtrl
// app.controller('profileCtrl', function($scope, $rootScope, $state, $stateParams, $localStorage, Story, Snippet, Profile ) {
//   $rootScope.user = $localStorage.token; 

//   var profilename = $state.params.profilename;
//   // console.log("Profilename!, \n", $state.params);
//   Profile.read(profilename)
//   .then(function(res) {
//     // console.log("RES, Profile:", res);
//     var data = res.data; 
//     $scope.profile = data; 
    
//     var snippets = data.snippets; 
//     var snippetstories = [];
//     snippets.forEach(function(entry){
//       if (snippetstories.indexOf(entry.storytitle) === -1) {
//         snippetstories.push(entry.storytitle);
//       }
//     });
//     // console.log(snippets, "SNIPPETS");
//     // console.log(snippetstories, "SNIPPETSTORIES");
//     $scope.contributions = snippetstories;
//     $scope.editobj = {
//       imageurl: data.imageurl,
//       aboutme: data.aboutme,
//       age: data.age, 
//       birthday: data.birthday,
//       gender: data.gender,
//       location: data.location,
//       interests: data.interests,
//       contact: data.contact
//     }
//   });

//   $scope.isediting = false; 
//   $scope.editprofile = function(){
//     $scope.isediting = !$scope.isediting; 
//   }

//   $scope.savechanges = function(editobj){
//     if (!$scope.isediting) return;
//     console.log("editobj \n", editobj);
//     Profile.edit(profilename, editobj).then(function(){
//       $scope.profile.imageurl = editobj.imageurl,
//       $scope.profile.aboutme = editobj.aboutme,
//       $scope.profile.age = editobj.age,
//       $scope.profile.birthday = editobj.birthday,
//       $scope.profile.gender = editobj.gender,
//       $scope.profile.location = editobj.location,
//       $scope.profile.interests = editobj.interests,
//       $scope.profile.contact = editobj.contact
//     }); 
//     $scope.isediting = false; 

//   }

// });

// Run: 
app.run(function(Auth, Story, $rootScope){
  Auth.user();
  Story.stories();
  $rootScope.stories = Story.data; 
});