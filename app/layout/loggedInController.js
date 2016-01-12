	"use strict";
	
  app
	.controller('loggedInController', ['$scope','$rootScope', '$state', 'dbdMenuCommServiceOut', function($scope, $rootScope, $state, dbdMenuCommServiceOut) {
		console.log("loggedInController: ", $rootScope.authState);
		dbdMenuCommServiceOut.setStates($state.get());
		//$state.go('dashboard');
	}]);	
	
 