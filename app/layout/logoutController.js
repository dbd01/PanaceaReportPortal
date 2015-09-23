	"use strict";
	
  app
	.controller('logoutController', ['$scope','$rootScope', function($scope,$rootScope) {
		$rootScope.log_link.value="Login";
		console.log("logout controoooolll");
		
	}]);