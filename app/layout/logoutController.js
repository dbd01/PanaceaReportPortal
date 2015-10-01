	"use strict";
	
  app
	.controller('logoutController', ['$scope','$rootScope','localStorageService', function($scope, $rootScope, localStorageService) {
		
		$rootScope.log_link.value="Login";		
		localStorageService.set('authorizationData', null);
				
	}]);