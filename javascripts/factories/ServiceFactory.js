"use strict";

app.factory("ServiceFactory", function($q, $http, $rootScope, FIREBASE_CONFIG) {

    let addService = (newService) => {
        return $q((resolve, reject) => {
            $http.post(`${FIREBASE_CONFIG.databaseURL}/services.json`,
                JSON.stringify({
                    title: newService.title,
                    detail: newService.detail,
                    gender: newService.gender,
                    locationCity: newService.locationCity,
                    locationState: newService.locationState,
                    zipCode: newService.zipCode,
                    rate: newService.rate,
                    mainSkill: newService.mainSkill,
                    secodarySkill: newService.secodarySkill,
                    mainGenre: newService.mainGenre,
                    secondaryGenre: newService.secondaryGenre,
                    readMusic: newService.readMusic,
                    uid: newService.uid
                })
            )
            .success((storeServiceSuccess) => {
                resolve(storeServiceSuccess);
            })
            .error((storeServiceError) => {
                reject(storeServiceError);
            });
        });
    };

    let getServices = (userId) => {
        console.log("this is working");
        return $q((resolve, reject) => {
            $http.get(`${FIREBASE_CONFIG.databaseURL}/services.json?orderBy="uid"&equalTo="${userId}"`)
            .success((userObject) => {
                let services = [];
                Object.keys(userObject).forEach((key) => {
                    userObject[key].id = key;
                    services.push(userObject[key]);
                });
                resolve(services);
            })
            .error((error) => {
                reject(error);
            });
        });
    };

    let getSingleService = function(selectedServiceId){
        return $q((resolve, reject)=>{
            $http.get(`${FIREBASE_CONFIG.databaseURL}/services/${selectedServiceId}.json`)
            .success(function(getSingleServiceResponse){
                getSingleServiceResponse.id = selectedServiceId;
                resolve(getSingleServiceResponse);
            })
            .error(function(getSingleServiceError){
                reject(getSingleServiceError);
            });
        });
    };

    let editService = (serviceToUpdate) => {
        return $q((resolve, reject) => {
            $http.put(`${FIREBASE_CONFIG.databaseURL}/services/${serviceToUpdate.id}.json`,
                JSON.stringify({
                    title: serviceToUpdate.title,
                    detail: serviceToUpdate.detail,
                    gender: serviceToUpdate.gender,
                    locationCity: serviceToUpdate.locationCity,
                    locationState: serviceToUpdate.locationState,
                    zipCode: serviceToUpdate.zipCode,
                    rate: serviceToUpdate.rate,
                    mainSkill: serviceToUpdate.mainSkill,
                    secodarySkill: serviceToUpdate.secodarySkill,
                    mainGenre: serviceToUpdate.mainGenre,
                    secondaryGenre: serviceToUpdate.secondaryGenre,
                    readMusic: serviceToUpdate.readMusic,
                    uid: serviceToUpdate.uid
                })
            )
            .success((storeServiceSuccess) => {
                resolve(storeServiceSuccess);
            })
            .error((storeServiceError) => {
                reject(storeServiceError);
            });
        });
    };

    let deleteService = (serviceId) => {
        return $q((resolve, reject)=>{
            $http.delete(`${FIREBASE_CONFIG.databaseURL}/services/${serviceId}.json`)
            .success(function(deleteResponse){
                resolve(deleteResponse);
            })
            .error(function(deleteError){
                reject(deleteError);
            });
        });
    };

    return{addService: addService, getServices: getServices, getSingleService: getSingleService, editService: editService, deleteService: deleteService};
});