	"use strict";
	
  app
	.controller('logoutController', ['$scope','$rootScope','localStorageService', '$http', 'appSettings',
	    function($scope, $rootScope, localStorageService, $http, appSettings) {
		
		$rootScope.log_link.value="Login";		
		localStorageService.set('authorizationData', null);

		$http.get(appSettings.casLogoutPath).
      success(function (response, status) {
      	console.log(status);
         console.log('sucesfull logout->', response);                       	 
      }).
      error(function (response, status) {  
      	console.log(status);                      
         console.log('logout error->', response);
      });    
				
	}]);