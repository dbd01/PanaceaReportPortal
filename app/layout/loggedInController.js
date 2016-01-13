(function(){
	"use strict";

	angular.module('PanaceaReports').controller('loggedInController', ['$scope','$rootScope',
  	'$state', 'dbdMenuCommServiceOut', 
  	function($scope, $rootScope, $state, dbdMenuCommServiceOut) {
			console.log("loggedInController: ", $rootScope.authState);
			dbdMenuCommServiceOut.setStates($state.get());
	}]);
})();