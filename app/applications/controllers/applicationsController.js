
"use strict";

app.controller("applicationsController", ['localStorageService','consoleService' ,'applicationsService','$scope',
   function (localStorageService, consoleService, applicationsService , $scope ) {
  
	var authData = localStorageService.get('authorizationData');
	consoleService.printIt("auth data--appl>", authData);	
       
  var applicationsTable ={
    "header": [
      { "title": "_id",  "showIt": true },
      { "title": "name", "showIt": true },
      { "title": "description", "showIt": true },
      { "title": "url", "showIt": true }
    ],
  	"data": [],
  	"ready": false
	}

  applicationsService.query().$promise.then(
    function (applications) {
    	consoleService.printIt("applications:=>",applications);
      applications.forEach(function (application) {
        var applicationData = [];
        applicationData.push( {"value": application._id, "showIt": true} );
        applicationData.push( {"value": application.name, "showIt": true} );
        applicationData.push( {"value": application.description, "showIt": true} );
        applicationData.push( {"value": application.url, "showIt": true} );                 
        applicationsTable.data.push(applicationData);                   
      });
    })    
    .then(function () {
      $scope.applicationsTable = applicationsTable;
      $scope.applicationsTable.ready = true;
      consoleService.printIt("aaaap", $scope.applicationsTable.data);                                
    });
}]);

