
"use strict";

app.controller("usersController", ['localStorageService', function (localStorageService) {
   
	var authData = localStorageService.get('authorizationData');
	console.log("auth data--uu>", authData);	
    

}]);

