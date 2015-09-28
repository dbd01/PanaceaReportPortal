
"use strict";

app.controller("usersController", ['localStorageService','usersService','$scope',
   function (localStorageService, usersService , $scope ) {
  
	var authData = localStorageService.get('authorizationData');
	console.log("auth data--uu>", authData);	
    
    
   
    var usersTable ={
                    "header": [
                        { "title": "user_Id" },
                        { "title": "username" },
                        { "title": "isDeleted" },                        
                    ],
    				"data": [],
    				"ready": false
    				}
    

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
                console.log("uuuu", $scope.usersTable.data);                                
                
            });

    
}]);

