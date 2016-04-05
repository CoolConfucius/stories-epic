app.controller('profileCtrl', function($scope, $rootScope, $state, $stateParams, $localStorage, Story, Snippet, Profile ) {
  $rootScope.user = $localStorage.token; 

  var profilename = $state.params.profilename;
  
  Profile.read(profilename)
  .then(function(res) {
    
    var data = res.data; 
    $scope.profile = data; 
    
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


  $scope.unfave = function(username, storyid, index){
    console.log("storyid", storyid, username, index);
    Story.unfave(username, storyid).then(function(){
      swal("Removed from favorites!")
      $scope.profile.favorites.splice(index, 1);
    })
  }

});
