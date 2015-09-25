
"use strict";

app.controller("usersController", ['localStorageService','usersService','$scope',
   function (localStorageService, usersService , $scope ) {
  
	var authData = localStorageService.get('authorizationData');
	console.log("auth data--uu>", authData);	
    
   $scope.displayedCollection = [];

    var usersTable ={
    				"data": [],
    				"ready": false
    				}
/*
    var usersTableColumns = [{label:"userId", map: "userId" },
                             {label:"username", map: "username" },
                             {label:"isDeleted", map: "isDeleted" }
							];
*/
    usersService.query().$promise.then(
            function (users) {
            	console.log("users:=>",users);
                users.forEach(function (user) {
                    var userData = [];
                    userData.push( {"value": user.userId} );
                    userData.push( {"value": user.username} );
                    userData.push( {"value": user.isDeleted});
                    usersTable.data.push(userData);
                   

                });
            })    
            .then(function () {
                $scope.usersTable = usersTable;
                $scope.usersTable.ready = true;
                console.log("uuuu", usersTable.data);
                
            });


    
}]);

