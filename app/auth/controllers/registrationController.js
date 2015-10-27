
"use strict";

app.controller("registrationController", ['localStorageService', 'consoleService', function (localStorageService, consoleService) {
   
	var authData = localStorageService.get('authorizationData');
	consoleService.printIt("nowwww--->", Date.now());	
    

}]);

