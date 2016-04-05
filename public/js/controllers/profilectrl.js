app.controller('profileCtrl', function($scope, $rootScope, $state, $stateParams, $localStorage, Story, Snippet, Profile ) {
  $rootScope.user = $localStorage.token; 

  var profilename = $state.params.profilename;
  // console.log("Profilename!, \n", $state.params);
  Profile.read(profilename)
  .then(function(res) {
    // console.log("RES, Profile:", res);
    var data = res.data; 
    $scope.profile = data; 
    
    // var snippets = data.snippets; 
    // var snippetstories = [];
    // snippets.forEach(function(entry){
    //   if (snippetstories.indexOf(entry.storytitle) === -1) {
    //     snippetstories.push(entry.storytitle);
    //   }
    // });
    // console.log(snippets, "SNIPPETS");
    // console.log(snippetstories, "SNIPPETSTORIES");
    // $scope.contributions = snippetstories;
    $scope.editobj = {
      imageurl: data.imageurl,
      aboutme: data.aboutme,
      age: data.age, 
      birthday: data.birthday,
      gender: data.gender,
      location: data.location,
      interests: data.interests,
      contact: data.contact
    }
  });

  $scope.isediting = false; 
  $scope.editprofile = function(){
    $scope.isediting = !$scope.isediting; 
  }

  $scope.savechanges = function(editobj){
    if (!$scope.isediting) return;
    console.log("editobj \n", editobj);
    Profile.edit(profilename, editobj).then(function(){
      $scope.profile.imageurl = editobj.imageurl,
      $scope.profile.aboutme = editobj.aboutme,
      $scope.profile.age = editobj.age,
      $scope.profile.birthday = editobj.birthday,
      $scope.profile.gender = editobj.gender,
      $scope.profile.location = editobj.location,
      $scope.profile.interests = editobj.interests,
      $scope.profile.contact = editobj.contact
    }); 
    $scope.isediting = false; 

  }

});
