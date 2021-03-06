app.service('Auth', function($http, $state, $localStorage, $rootScope) {
  this.register = function(user) {    
    // return $http({method: 'POST', url: '/register', data: user})
    return $http({method: 'POST', url: '/users/register', data: user})
  };

  this.login = (user) => {
    // return $http({method: 'POST', url: '/login', data: user});
    return $http({method: 'POST', url: '/users/login', data: user});
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