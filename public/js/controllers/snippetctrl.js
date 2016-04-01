app.controller('snippetCtrl', function($scope, $rootScope, $state, $stateParams, $localStorage, Story, Snippet ) {
  $rootScope.user = $localStorage.token; 

  console.log("in snippetCtrl");  
  var snippetid = $state.params.snippetid;

  Snippet.read(snippetid)
  .then(function(res) {
    console.log("read snippet");
    $scope.snippet = res.data; 
  });


  $scope.isediting = false; 
  $scope.editsnippet = function(snippet, user) {
    console.log("edit snippet!", snippet, user);
    if (!user) return;
    if (snippet.writtenby !== user.config.data.username) return;
    console.log("Edit snippet! Passed error handling");
    $scope.isediting = !$scope.isediting; 
  }

  $scope.isdeleting = false; 
  $scope.deletesnippet = function(snippet, user) {
    console.log("deletesnippet snippet!", snippet, user);
    if (!user) return;
    if (snippet.writtenby !== user.config.data.username) return;
    console.log("Delete snippet! Passed error handling");
    $scope.isdeleting = !$scope.isdeleting; 
  }



});
