
"use strict";

app.controller("permissionsController", ['localStorageService','permissionsService','$scope',
   function (localStorageService, permissionsService, $scope ) {
  
	var authData = localStorageService.get('authorizationData');
	console.log("auth data--pp>", authData);	
       
    var permissionsTable ={
                    "header": [
                        { "title": "_id",  "showIt": true },
                        { "title": "name",  "showIt": true },
                        { "title": "type", "showIt": true },
                        { "title": "url", "showIt": true },
                        { "title": "isDeleted", "showIt": true }                     
                    ],
    				"data": [],
    				"ready": false
    				}    

    permissionsService.query().$promise.then(
            function (permissions) {
            	console.log("groups:=>",permissions);
                permissions.forEach(function (permission) {
                    var permissionData = [];
                    permissionData.push( {"value": permission._id, "showIt": true} );
                    permissionData.push( {"value": permission.name, "showIt": true} );
                    permissionData.push( {"value": permission.type, "showIt": true} );
                    permissionData.push( {"value": permission.url, "showIt": true} );
                    permissionData.push( {"value": permission.isDeleted, "showIt": true});                                      
                    permissionsTable.data.push(permissionData);                 
                });
            })    
            .then(function () {
                $scope.permissionsTable = permissionsTable;
                $scope.permissionsTable.ready = true;
                console.log("ppp", $scope.permissionsTable.data);                                
                
            });
    
}]);

