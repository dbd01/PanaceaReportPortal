
"use strict";

app.controller("applicationInfoController", ['localStorageService', 'consoleService','applicationsService', 'groupsService','$scope', 'scopeComService','$location',
   function (localStorageService, consoleService, applicationsService, groupsService, $scope , scopeComService, $location ) {
    
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

