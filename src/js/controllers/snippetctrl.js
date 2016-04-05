app.controller('snippetCtrl', function($scope, $rootScope, $state, $stateParams, $localStorage, Story, Snippet ) {
  $rootScope.user = $localStorage.token; 
  
  var snippetid = $state.params.snippetid;
  
  $scope.editcontent = '';

  Snippet.read(snippetid)
  .then(function(res) {    
    $scope.snippet = res.data; 
    $scope.editcontent = res.data.content; 
  });

  $scope.savechanges = function(editcontent){    
    Snippet.edit(snippetid, editcontent).then(function(){
      $scope.snippet.content = editcontent;
    });
  };

  $scope.isdeleting = false; 
  $scope.deletesnippet = function(snippet, user) {    
    if (!user) return;
    if (snippet.writtenby !== user.config.data.username) return;    
    $scope.isdeleting = !$scope.isdeleting; 
  }

  $scope.remove = function(){
    var storyid = $scope.snippet.storyid; 
    Snippet.remove(snippetid).then(function(){
      $state.go('story', {storyid:storyid});
    })
  }



});
