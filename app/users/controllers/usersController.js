
"use strict";

app.controller("usersController", ['localStorageService','usersService','$scope',
   function (localStorageService, usersService , $scope ) {
  
	var authData = localStorageService.get('authorizationData');
	console.log("auth data--uu>", authData);	
    
    
   
    var usersTable ={
    				"data": [],
    				"ready": false
    				}
    

    usersService.query().$promise.then(
            function (users) {
            	console.log("users:=>",users);
                users.forEach(function (user) {
                    var userData = [];
                    userData.push( {"userId": user.userId} );
                    userData.push( {"username": user.username} );
                    userData.push( {"isDeleted": user.isDeleted});
                    usersTable.data.push(userData);                   

                });
            })    
            .then(function () {
                $scope.usersTable = usersTable;
                $scope.usersTable.ready = true;
                console.log("uuuu", $scope.usersTable.data);                                
                
            });

    
}]);

