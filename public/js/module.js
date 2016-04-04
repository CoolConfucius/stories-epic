'use strict'; 

var app = angular.module("app", ["ui.router", "ngStorage"]); 

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('home', { url: '/', templateUrl: 'html/home.html', controller: 'mainCtrl' })
  .state('register', { url: '/register', templateUrl: 'html/register.html', controller: 'mainCtrl' })
  .state('createstory', { url: '/createstory', templateUrl: 'html/createstory.html', controller: 'mainCtrl' })
  .state('story', { url: '/story/:storyid', templateUrl: 'html/story.html', controller: 'storyCtrl' })
  .state('snippet', { url: '/snippet/:snippetid', templateUrl: 'html/snippet.html', controller: 'snippetCtrl' })
  .state('profile', { url: '/profile/:profilename', templateUrl: 'html/profile.html', controller: 'profileCtrl' })
  .state('userstories', { url: '/userstories/:profilename', templateUrl: 'html/userstories.html', controller: 'userstoriesCtrl' })
  .state('usersnippets', { url: '/usersnippets/:profilename', templateUrl: 'html/usersnippets.html', controller: 'usersnippetsCtrl' })
  .state('userfavorites', { url: '/userfavorites/:profilename', templateUrl: 'html/userfavorites.html', controller: 'userfavoritesCtrl' })
  $urlRouterProvider.otherwise('/');
});

app.run(function(Auth, Story, $rootScope){
  Auth.user();
  Story.stories();
  $rootScope.stories = Story.data; 
});