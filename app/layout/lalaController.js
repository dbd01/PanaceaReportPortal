	"use strict";
	
  app
	.controller('lalaController', ['$scope','$rootScope', function($scope, $rootScope) {
		console.log("lalaController: ", $rootScope.state);
	}]);	
	
 