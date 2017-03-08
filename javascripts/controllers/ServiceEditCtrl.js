"use strict";

app.controller("ServiceEditCtrl", function ($scope, $routeParams, $location, ServiceFactory){
  $scope.selectedService = {};

  let serviceId = $routeParams.id;

  ServiceFactory.getSingleService(serviceId).then(function(serviceToEdit){
    console.log("serviceToEdit", serviceToEdit);
    $scope.selectedService = serviceToEdit;
  });

  $scope.updateThisService = function(){
    console.log("selectedService", $scope.selectedService);
    ServiceFactory.editService($scope.selectedService).then(()=>{
      $location.url(`/talent/services/view/${serviceId}`);
    });
  };

});