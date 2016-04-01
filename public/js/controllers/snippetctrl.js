app.controller('snippetCtrl', function($scope, $rootScope, $state, $stateParams, $localStorage, Story, Snippet ) {
  $rootScope.user = $localStorage.token; 

  console.log("in snippetCtrl");  
  var snippetid = $state.params.snippetid;
  
  $scope.editcontent = '';

  Snippet.read(snippetid)
  .then(function(res) {
    console.log("read snippet");
    $scope.snippet = res.data; 
    $scope.editcontent = res.data.content; 
  });

  $scope.savechanges = function(editcontent){
    console.log(editcontent);
    Snippet.edit(snippetid, editcontent).then(function(){
      $scope.snippet.content = editcontent;
    });
  };

  $scope.isdeleting = false; 
  $scope.deletesnippet = function(snippet, user) {
    console.log("deletesnippet snippet!", snippet, user);
    if (!user) return;
    if (snippet.writtenby !== user.config.data.username) return;
    console.log("Delete snippet! Passed error handling");
    $scope.isdeleting = !$scope.isdeleting; 
  }

  $scope.remove = function(){
    var storyid = $scope.snippet.storyid; 
    Snippet.remove(snippetid).then(function(){
      console.log(`story/`, storyid);
      // $state.go(`home`);
      $state.go('story',{storyid:storyid});
    })
  }



});
