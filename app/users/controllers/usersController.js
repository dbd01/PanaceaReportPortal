
"use strict";

app.controller("usersController", ['localStorageService','usersService','$scope',
   function (localStorageService, usersService , $scope ) {
  
	var authData = localStorageService.get('authorizationData');
	console.log("auth data--uu>", authData);	
       
    var usersTable ={
                    "header": [
                        { "title": "user_Id",  "showIt": true },
                        { "title": "username", "showIt": true },
                        { "title": "isDeleted", "showIt": true },
                        { "title": "hashedPassword", "showIt": false}

                    ],
    				"data": [],
    				"ready": false
    				}    

    usersService.query().$promise.then(
            function (users) {
            	console.log("users:=>",users);
                users.forEach(function (user) {
                    var userData = [];
                    userData.push( {"value": user.userId, "showIt": true} );
                    userData.push( {"value": user.username, "showIt": true} );
                    userData.push( {"value": user.isDeleted, "showIt": true}); 
                    userData.push( {"value": user.hashedPassword, "showIt": false});                   
                    usersTable.data.push(userData);                   

                });
            })    
            .then(function () {
                $scope.usersTable = usersTable;
                $scope.usersTable.ready = true;
                console.log("uuuu", $scope.usersTable.data);                                
                
            });
    
}]);

