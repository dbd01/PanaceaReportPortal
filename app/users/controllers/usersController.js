
"use strict";

app.controller("usersController", ['localStorageService','usersService','$scope', 'consoleService',
   function (localStorageService, usersService , $scope, consoleService ) {
  
	var authData = localStorageService.get('authorizationData');
	consoleService.printIt("auth data--uu>", authData);
          
    var usersTable ={
                    "header": [
                        { "title": "_id",  "showIt": true },
                        { "title": "Username", "showIt": true },
                        { "title": "isDeleted", "showIt": true },
                        { "title": "email", "showIt": true },
                        { "title": "confirmed", "showIt": true },
                        { "title": "active", "showIt": true },
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
                    userData.push( {"value": user._id, "showIt": true} );
                    userData.push( {"value": user.username, "showIt": true} );
                    userData.push( {"value": user.isDeleted, "showIt": true});
                    userData.push( {"value": user.email, "showIt": true});
                    userData.push( {"value": user.confirmed, "showIt": true});
                    userData.push( {"value": user.active, "showIt": true}); 
                    userData.push( {"value": user.hashedPassword, "showIt": false});                   
                    usersTable.data.push(userData);                   

                });
            })    
            .then(function () {
                $scope.usersTable = usersTable;
                $scope.usersTable.ready = true;
                //console.log("uuuu", $scope.usersTable.data);                                
                
            });
    
}]);

