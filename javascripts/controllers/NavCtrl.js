"use strict";

app.controller("NavCtrl", ($scope, $location, AuthFactory) => {

  $scope.isLoggedIn = function() {
    return AuthFactory.isAuthenticated();
  };

  $scope.logoutUser = function(){
    AuthFactory.logout();
    $location.url("/auth");
  };

});
