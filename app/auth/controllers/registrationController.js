
"use strict";

app.controller("registrationController", ['localStorageService', function (localStorageService) {
   
	var authData = localStorageService.get('authorizationData');
	console.log("auth data--->", authData);	
    

}]);

