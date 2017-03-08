"use strict";

app.factory("InterestFactory", function($q, $http, FIREBASE_CONFIG) {

    let addInterest = (newInterest) => {
        console.log("newInterest", newInterest);
        return $q((resolve, reject) => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/interests.json`,
                JSON.stringify({
                  jobId: newInterest.id,
                  uid: newInterest.uid,
                  isCompleted: false
                })
            )
            .success((storeInterestSuccess) => {
                resolve(storeInterestSuccess);
            })
            .error((storeInterestError) => {
                reject(storeInterestError);
            });
        });
    };

    let getInterestsByJob = (jobId) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/interests.json?orderBy="jobId"&equalTo="${jobId}"`)
            .success((getInterestResponse) => {
                let interests = [];
                Object.keys(getInterestResponse).forEach((key) => {
                    getInterestResponse[key].id = key;
                    interests.push(getInterestResponse[key]);
                });
                resolve(interests);
            })
            .error((getInterestsError) => {
                reject(getInterestsError);
            });
        });
    };

    let getInterestsByUser = (uid) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/interests.json?orderBy="uid"&equalTo="${uid}"`)
            .success((getInterestResponse) => {
                let interests = [];
                Object.keys(getInterestResponse).forEach((key) => {
                    getInterestResponse[key].id = key;
                    interests.push(getInterestResponse[key]);
                });
                resolve(interests);
            })
            .error((getInterestsError) => {
                reject(getInterestsError);
            });
        });
    };

    let editInterest = function(editInterest, currentUserId){
        console.log("factory edit response", editInterest);
        return $q((resolve, reject)=>{
          $http.put(`${FIREBASE_CONFIG.databaseURL}/interests/${editInterest.interestId}.json`, JSON.stringify({
                jobId: editInterest.jobId,
                uid: currentUserId,
                isCompleted: editInterest.isCompleted
            })
          )
            .success(function(editResponse){
              resolve(editResponse);
            })
            .error(function(editError){
              reject(editError);
            });
        });
      };

    let deleteInterest = (interestId) => {
        console.log("interestId", interestId);
        return $q((resolve, reject)=>{
            $http.delete(`${FIREBASE_CONFIG.databaseURL}/interests/${interestId}.json`)
            .success(function(deleteInterestResponse){
                resolve(deleteInterestResponse);
            })
            .error(function(deleteInterestError){
                reject(deleteInterestError);
            });
        });
    };

    return{addInterest: addInterest, getInterestsByJob: getInterestsByJob, getInterestsByUser: getInterestsByUser, editInterest: editInterest, deleteInterest: deleteInterest};
});