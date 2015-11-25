	"use strict";
	
  app
	.controller('logoutController', ['$scope','$rootScope','localStorageService', '$http',
	    function($scope, $rootScope, localStorageService, $http) {
		
		$rootScope.log_link.value="Login";		
		localStorageService.set('authorizationData', null);

		$http.get(appSettings.casLogoutPath).
                    success(function (response, status) {
                       console.log('sucesfull logout->', response);                       	 
                    }).
                    error(function (response, status) {                        
                       console.log('logout error->', response);
                    });    
				
	}]);