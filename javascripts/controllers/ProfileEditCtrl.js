"use strict";

app.controller("ProfileEditCtrl", function ($scope, $routeParams, $location, UserFactory, AuthFactory){

  console.log("route connected");
  $scope.selectedUser = {};

  let userId = AuthFactory.getUser().uid;

  UserFactory.getUser(userId).then((currentUser)=>{
    $scope.selectedUser = currentUser;
  });

 $scope.updateUser = function(){
    console.log("selectedUser", $scope.selectedUser);
    UserFactory.editUser($scope.selectedUser).then((currentUser)=>{
      $location.url("/talent/profile");
    });
  };

});