
"use strict";

app.controller("userInfoController", ['groupsService','$scope','consoleService', function (groupsService, $scope, consoleService ) {
    
	  //fetch the groups list

        var groupsTbl ={                    
                        "data": [],
                        "ready": false
                        }    

        groupsService.query().$promise.then(
                function (groups) {
                    consoleService.printIt("groups:=>",groups);
                    groups.forEach(function (group) {
                        var groupData = [];
                        groupData.push( {"value": group._id} );
                        groupData.push( {"value": group.name} );
                        groupData.push( {"value": group.description} );                                                             
                        groupsTbl.data.push(groupData);                 
                    });
                })    
                .then(function () {
                    $scope.groupsTbl = groupsTbl;
                    $scope.groupsTbl.ready = true;
                    consoleService.printIt("gggyyy", $scope.groupsTbl.data);                                
                    
                });

     
}]);

