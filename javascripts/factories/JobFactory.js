"use strict";

app.factory("JobFactory", function($q, $http, FIREBASE_CONFIG) {

    let addJob = (newJob) => {
        return $q((resolve, reject) => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/job.json`,
                JSON.stringify({
                    title: newJob.title,
                    pay: newJob.pay,
                    numberTalentNeeded: newJob.numberTalentNeeded,
                    gender: newJob.gender,
                    musicGenre: newJob.musicGenre,
                    skillNeededMain: newJob.skillNeededMain,
                    readMusicRequired: newJob.readMusicRequired,
                    locationCity: newJob.locationCity,
                    locationState: newJob.locationState,
                    zipCode: newJob.zipCode,
                    uid: newJob.uid
                })
            )
            .success((storeJobSuccess) => {
                resolve(storeJobSuccess);
            })
            .error((storeJobError) => {
                reject(storeJobError);
            });
        });
    };

    let getJobs = (userId) => {
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/jobs.json`)
            .success((userObject) => {
                let jobs = [];
                Object.keys(userObject).forEach((key) => {
                    userObject[key].id = key;
                    jobs.push(userObject[key]);
                });
                resolve(jobs);
            })
            .error((error) => {
                reject(error);
            });
        });
    };

    let getSingleJob = function(selectedJobId){
        return $q((resolve, reject)=>{
            $http.get(`${FIREBASE_CONFIG.databaseURL}/jobs/${selectedJobId}.json`)
            .success(function(getSingleJobResponse){
                resolve(getSingleJobResponse);
            })
            .error(function(getSingleJobError){
                reject(getSingleJobError);
            });
        });
    };

    return{addJob: addJob, getJobs: getJobs, getSingleJob: getSingleJob};
});