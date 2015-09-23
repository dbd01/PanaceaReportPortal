
"use strict";

app.controller("reportsController", ['localStorageService', function (localStorageService) {
   
	var authData = localStorageService.get('authorizationData');
	console.log("auth data--rr>", authData);	
    

}]);

