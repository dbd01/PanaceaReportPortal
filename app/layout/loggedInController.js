	"use strict";
	
  app
	.controller('loggedInController', ['$scope','$rootScope', '$state', 'dbdMenuCommServiceOut', function($scope, $rootScope, $state, dbdMenuCommServiceOut) {
		console.log("loggedInController: ", $rootScope.authState);
		dbdMenuCommServiceOut.setValue($state.get());
		//$state.go('dashboard');
	}]);	
	
 