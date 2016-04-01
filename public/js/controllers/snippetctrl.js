app.controller('snippetCtrl', function($scope, $rootScope, $state, $stateParams, $localStorage, Story, Snippet ) {
  $rootScope.user = $localStorage.token; 
  
  var snippetid = $state.params.snippetid;

  Snippet.read(snippetid)
  .then(function(res) {
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
});
