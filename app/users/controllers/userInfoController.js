
"use strict";

app.controller("userInfoController", ['localStorageService','usersService', 'groupsService','$scope', 'scopeComService','$location',
   function (localStorageService, usersService, groupsService, $scope , scopeComService, $location ) {
    
	  //fetch the groups list

        var groupsTbl ={                    
                        "data": [],
                        "ready": false
                        }    

        groupsService.query().$promise.then(
                function (groups) {
                    console.log("groups:=>",groups);
                    groups.forEach(function (group) {
                        var groupData = [];
                        groupData.push( {"value": group.groupId} );
                        groupData.push( {"value": group.description} );
                        groupData.push( {"value": group.isDeleted});                                      
                        groupsTbl.data.push(groupData);                 
                    });
                })    
                .then(function () {
                    $scope.groupsTbl = groupsTbl;
                    $scope.groupsTbl.ready = true;
                    console.log("gggyyy", $scope.groupsTbl.data);                                
                    
                });

     
}]);

