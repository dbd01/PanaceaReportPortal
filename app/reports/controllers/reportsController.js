
"use strict";

app.controller("reportsController", ['localStorageService' , 'consoleService', function (localStorageService, consoleService) {
   
	var authData = localStorageService.get('authorizationData');
	consoleService.printIt("auth data--rr>", authData);	
    

}]);

