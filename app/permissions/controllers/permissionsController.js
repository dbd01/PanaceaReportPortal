
"use strict";

app.controller("groupsController", ['localStorageService','groupsService','$scope',
   function (localStorageService, groupsService, $scope ) {
  
	var authData = localStorageService.get('authorizationData');
	console.log("auth data--gg>", authData);	
       
    var groupsTable ={
                    "header": [
                        { "title": "_id",  "showIt": true },
                        { "title": "name",  "showIt": true },
                        { "title": "description", "showIt": true },
                        { "title": "isDeleted", "showIt": true }                     
                    ],
    				"data": [],
    				"ready": false
    				}    

    groupsService.query().$promise.then(
            function (groups) {
            	console.log("groups:=>",groups);
                groups.forEach(function (group) {
                    var groupData = [];
                    groupData.push( {"value": group._id, "showIt": true} );
                    groupData.push( {"value": group.name, "showIt": true} );
                    groupData.push( {"value": group.description, "showIt": true} );
                    groupData.push( {"value": group.isDeleted, "showIt": true});                                      
                    groupsTable.data.push(groupData);                 
                });
            })    
            .then(function () {
                $scope.groupsTable = groupsTable;
                $scope.groupsTable.ready = true;
                console.log("ggg", $scope.groupsTable.data);                                
                
            });
    
}]);

