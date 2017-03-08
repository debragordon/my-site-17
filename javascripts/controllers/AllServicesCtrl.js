"use strict";

app.controller("AllServicesCtrl", function ($scope, $routeParams, $route, $rootScope, ServiceFactory){
  $scope.myServices = [];
  $scope.singleServce = {};
  let loggedInUserId = $rootScope.user.uid;


  console.log("loggedInUserId", loggedInUserId);

  ServiceFactory.getServices(loggedInUserId).then((userServiceList)=>{ //fix this to only get the User's services
    console.log("userServiceList", userServiceList);
    $scope.myServices = userServiceList;
  });

  $scope.deleteThisService = function(serviceToDelete){
    console.log("serviceToDelete", serviceToDelete);
    ServiceFactory.deleteService(serviceToDelete).then((serviceDelete)=>{
      console.log("serviceDelete", serviceDelete);
      $scope.updatedService = serviceDelete;
      $route.reload();
    });
  };
});
