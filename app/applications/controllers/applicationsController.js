
"use strict";

app.controller("applicationsController", ['localStorageService','applicationsService','$scope',
   function (localStorageService, applicationsService , $scope ) {
  
	var authData = localStorageService.get('authorizationData');
	console.log("auth data--appl>", authData);	
       
    var applicationsTable ={
                    "header": [
                        { "title": "applicationId",  "showIt": true },
                        { "title": "name", "showIt": true },
                        { "title": "description", "showIt": true },
                        { "title": "protocol", "showIt": true},
                        { "title": "link", "showIt": true },
                        { "title": "port", "showIt": true },
                        { "title": "hostname", "showIt": true}

                    ],
    				"data": [],
    				"ready": false
    				}    

    applicationsService.query().$promise.then(
            function (applications) {
            	console.log("applications:=>",applications);
                users.forEach(function (application) {
                    var applicationData = [];
                    applicationData.push( {"value": application.applicationId, "showIt": true} );
                    applicationData.push( {"value": application.name, "showIt": true} );
                    applicationData.push( {"value": application.description, "showIt": true} );
                    applicationData.push( {"value": application.protocol, "showIt": true} );
                    applicationData.push( {"value": application.link, "showIt": true} );
                    applicationData.push( {"value": application.port, "showIt": true} );
                    applicationData.push( {"value": application.hostname, "showIt": true} );
                                     
                    applicationsTable.data.push(applicationData);                   

                });
            })    
            .then(function () {
                $scope.applicationsTable = applicationsTable;
                $scope.applicationsTable.ready = true;
                console.log("aaaap", $scope.applicationsTable.data);                                
                
            });
    
}]);

