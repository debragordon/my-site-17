"use strict";

app.controller("ServiceAddCtrl", function ($scope, $rootScope, $location, ServiceFactory){

  $scope.selectedService = {
    title: "",
    detail: "",
    gender: "",
    locationCity: "",
    locationState: "",
    zipCode: "",
    rate: "",
    mainSkill: "",
    secodarySkill: "",
    mainGenre: "",
    secondaryGenre: "",
    readMusic: "",
    uid: $rootScope.user.uid
  };

  $scope.updateThisService = function(){
    console.log("selectedService", $scope.selectedService);
    ServiceFactory.addService($scope.selectedService).then(()=>{
      $location.url(`/talent/services/all`);
    });
  };

});