	"use strict";
	
  app
	.controller('loggedInController', ['$scope','$rootScope', '$state', 'dbdMenuCommServiceOut', function($scope, $rootScope, $state, dbdMenuCommServiceOut) {
		console.log("loggedInController: ", $rootScope.state);
		dbdMenuCommServiceOut.setValue($state.get());
	}]);	
	
 