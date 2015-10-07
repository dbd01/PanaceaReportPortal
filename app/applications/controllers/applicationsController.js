
"use strict";

app.controller("applicationsController", ['localStorageService','applicationsService','$scope',
   function (localStorageService, applicationsService , $scope ) {
  
	var authData = localStorageService.get('authorizationData');
	console.log("auth data--appl>", authData);	
       
    var applicationsTable ={
                    "header": [
                        { "title": "application_Id",  "showIt": true },
                        { "title": "name", "showIt": true },
                        { "title": "description", "showIt": true },
                        { "title": "protocol", "showIt": true}

                        

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

