
"use strict";

app.controller("groupInfoController", ['permissionsService','$scope',  function ( permissionsService, $scope ) {
    
	 //fetch the permissions list

        var permissionsTbl ={                    
                        "data": [],
                        "ready": false
                        }    

        permissionsService.query().$promise.then(
                function (permissions) {
                    console.log("permissions:=>",permissions);
                    permissions.forEach(function (permission) {
                        var permissionData = [];
                        permissionData.push( {"value": permission._id} );
                        permissionData.push( {"value": permission.name} );
                        permissionData.push( {"value": permission.type} );
                        permissionData.push( {"value": permission.url}); 
                        permissionData.push( {"value": permission.isDeleted});                                     
                        permissionsTbl.data.push(permissionData);                 
                    });
                })    
                .then(function () {
                    $scope.permissionsTbl = permissionsTbl;
                    $scope.permissionsTbl.ready = true;
                    console.log("pppppyyy", $scope.permissionsTbl.data);                                
                    
                });
     
}]);

