"use strict";

app.controller("JobDetailCtrl", function ($scope, $routeParams, $rootScope, $location, JobFactory, InterestFactory, UserFactory){

  $scope.selectedJob = {};

  let jobId = $routeParams.id;
  console.log("jobId", jobId);

  JobFactory.getSingleJob(jobId).then(function(oneJob){
    oneJob.id = jobId;
    oneJob.users = [];
    InterestFactory.getInterestsByJob(jobId).then(function(interestedPeople){
      let interestedPeopleArray = interestedPeople;
      interestedPeopleArray.forEach(function(person){
        UserFactory.getUser(person.uid).then(function(userInfo){
          oneJob.users.push(userInfo);
          if (userInfo.uid === $rootScope.user.uid){
            $scope.interestId = person.id;
            $scope.isCompleted = person.isCompleted;
          }
        });
      });
    });
    console.log("oneJob", oneJob);
    $scope.selectedJob = oneJob;
  });

  $scope.showInterest = function(job){
    let interest = {
      id: job.id,
      uid: $rootScope.user.uid
    };
    InterestFactory.addInterest(interest).then(function(){
      $location.url("/talent/myjobs");
    });
    //add star to the job so user can see it's theirs; shows visually universally no matter where the job is in the app

    //display job in the interested category on the my jobs page

    //push user to the "my jobs" page
  };

  $scope.removeInterest = function(job){
    InterestFactory.deleteInterest($scope.interestId).then(function(){
        $scope.interestId = null;
    });
  };


});