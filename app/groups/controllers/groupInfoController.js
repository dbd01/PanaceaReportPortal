
"use strict";

app.controller("groupInfoController", ['permissionsService', 'consoleService', '$scope',  function ( permissionsService, consoleService, $scope ) {
    
	 //fetch the permissions list

        var permissionsTbl ={                    
                        "data": [],
                        "ready": false
                        }    

        permissionsService.query().$promise.then(
                function (permissions) {
                    consoleService.printIt("permissions:=>",permissions);
                    permissions.forEach(function (permission) {
                        var permissionData = [];
                        permissionData.push( {"value": permission._id} );
                        permissionData.push( {"value": permission.name} );
                        permissionData.push( {"value": permission.type} );
                        permissionData.push( {"value": permission.url});                                                             
                        permissionsTbl.data.push(permissionData);                 
                    });
                })    
                .then(function () {
                    $scope.permissionsTbl = permissionsTbl;
                    $scope.permissionsTbl.ready = true;
                    consoleService.printIt("pppppyyy", $scope.permissionsTbl.data);                                
                    
                });
     
}]);

